import { getByteCount } from '@/assets/util/transactionUtil/transSize.js'
import validate from 'bitcoin-address-validation'
import { getTxByHash, decodeRawTransaction } from '@/assets/util/nodeUtil.js'
import { m, vpubObject } from '@/assets/constants/userConstantFiles.js'
const R = require('ramda')
const BigNumber = require('bignumber.js')

function getTransactionSize (addressArray, musigNeeded, musigTotal, inputNumber) {
  const inputInfo = {}
  const inputString = 'MULTISIG-P2WSH'.concat(`:${musigNeeded}-${musigTotal}`)
  inputInfo[inputString] = inputNumber

  const addressTypeArray = getAddressTypeArray(addressArray)
  const outputInfo = addToOutPutInfo(addressTypeArray)
  const virtualSize = getByteCount(inputInfo, outputInfo)
  return new BigNumber(virtualSize)
}

function getAddressTypeArray (addressArray) {
  const getAddressType = address => validate(address).type.toUpperCase()
  const addressTypeArray = R.map(getAddressType, addressArray)
  return addressTypeArray
}

async function getScriptPubkey (txId, vout, walletId) {
  const trans = await getTxByHash(txId, walletId)
  const transHex = trans.tx
  const scriptSigHex = await decodeRawTransaction(transHex)
  const sig = scriptSigHex.vout[vout].scriptPubKey.hex
  return sig
}

async function noChange (desiredFeeRate, addressArray, addressArrayAmounts, utxo) {
  const musigTotalNumber = Object.keys(vpubObject).length
  const feeAmountSatoshi = getFeeAmountSatoshi(addressArray, desiredFeeRate, utxo.length,
    musigTotalNumber)
  const getValue = x => new BigNumber(x.value)
  const utxoArray = R.map(getValue, utxo)
  const utxoSum = BigNumber.sum.apply(null, utxoArray)
  const addressArraySum = BigNumber.sum.apply(null, addressArrayAmounts)
  if (utxoSum.isLessThan(addressArraySum.plus(feeAmountSatoshi))) {
    throw new Error('Not Enough Funds')
  }
  addressArrayAmounts[0] = utxoSum.minus(feeAmountSatoshi.plus(addressArraySum))
  const convertToBTC = x => x.shiftedBy(-8).toFormat(8)
  const newAmountArray = R.map(convertToBTC, addressArrayAmounts)
  return newAmountArray
}

function getTrasactionData (addressArray, addressArrayAmount, utxo, targetFeeRatio) {
  const musigTotalNumber = Object.keys(vpubObject).length
  const sortByFirstHeight = R.sortBy(R.prop('height'))
  const fifoCoins = sortByFirstHeight(utxo)
  const totalOutputsAmountNeeded = BigNumber.sum.apply(null, addressArrayAmount)

  let inputsArray = []
  let currentInputSum = new BigNumber(0)
  let postOutputFifoUtxo = fifoCoins

  const totalOutputsPossible = checkIfEnoughFunds(fifoCoins, totalOutputsAmountNeeded)
  if (!totalOutputsPossible) {
    throw new Error('Not Enough Funds')
  }

  while (currentInputSum.isLessThan(totalOutputsAmountNeeded)) {
    inputsArray = R.append(postOutputFifoUtxo[0], inputsArray)
    currentInputSum = currentInputSum.plus(new BigNumber(postOutputFifoUtxo[0].value))
    postOutputFifoUtxo = R.drop(1, postOutputFifoUtxo)
  }
  const noChangeFeeAmountSatoshi =
    getFeeAmountSatoshi(addressArray, targetFeeRatio,
      inputsArray.length, musigTotalNumber)
  const minFees = noChangeFeeAmountSatoshi

  const totalOutputsPossible0 = checkIfEnoughFunds(postOutputFifoUtxo, minFees)
  const changeExist = currentInputSum.isGreaterThan(minFees)
  if (!totalOutputsPossible0 && !changeExist) {
    throw new Error('Not Enough Funds')
  }
  while (currentInputSum.isLessThan(minFees.plus(totalOutputsAmountNeeded))) {
    if (R.isEmpty(postOutputFifoUtxo)) {
      throw new Error('Not Enough Funds')
    }
    inputsArray = R.append(postOutputFifoUtxo[0], inputsArray)
    currentInputSum = currentInputSum.plus(new BigNumber(postOutputFifoUtxo[0].value))
    postOutputFifoUtxo = R.drop(1, postOutputFifoUtxo)
  }
  const change = currentInputSum.minus(minFees.plus(totalOutputsAmountNeeded))
  const changeAddressArray = R.append('tb1qfhswexghg04qj74dw6rl53ejtlvwfycsveqq0fegfvcz5ssk3jdsp32rme',
    addressArray)
  const changeFeeAmountSatoshi =
    getFeeAmountSatoshi(changeAddressArray, targetFeeRatio,
      inputsArray.length, musigTotalNumber)
  const costToKeepChange = changeFeeAmountSatoshi.minus(noChangeFeeAmountSatoshi)
  if (costToKeepChange.isGreaterThan(change)) {
    const proposedTransaction = {}
    proposedTransaction.inputs = inputsArray
    proposedTransaction.feeAmount = change.plus(noChangeFeeAmountSatoshi)
    proposedTransaction.transactionSize = getTransactionSize(addressArray, m, musigTotalNumber,
      inputsArray.length)
    proposedTransaction.changeAmount = new BigNumber(0)
    proposedTransaction.remainingUtxo = postOutputFifoUtxo
    return proposedTransaction
  } else {
    // change
    const proposedTransaction = {}
    proposedTransaction.inputs = inputsArray
    proposedTransaction.feeAmount = changeFeeAmountSatoshi
    proposedTransaction.transactionSize = getTransactionSize(changeAddressArray, m, musigTotalNumber,
      inputsArray.length)
    proposedTransaction.changeAmount = change
    proposedTransaction.remainingUtxo = postOutputFifoUtxo
    return proposedTransaction
  }
}

function checkIfEnoughFunds (funds, desiredAmount) {
  if (R.isEmpty(funds)) {
    return false
  }
  const getValue = x => new BigNumber(x.value)
  const fundArray = R.map(getValue, funds)
  const fundsTotal = BigNumber.sum.apply(null, fundArray)
  if (fundsTotal.isLessThan(desiredAmount)) {
    return false
  }
  return true
}

function getFeeAmountSatoshi (addressArray, feePerB, inputNumber,
  musigTotalNumber) {
  const transSizeVBtyes = getTransactionSize(addressArray, m, musigTotalNumber, inputNumber)
  const correctValue = transSizeVBtyes.multipliedBy(feePerB).dp(0)
  return correctValue
}

function addToOutPutInfo (addressTypeArray) {
  const outputInfo = {}
  addressTypeArray.forEach(function (element) {
    if (R.has(element)(outputInfo)) {
      outputInfo[element] += 1
    } else {
      outputInfo[element] = 1
    }
  })
  return outputInfo
}

export { getTransactionSize, getScriptPubkey, getTrasactionData, noChange }
