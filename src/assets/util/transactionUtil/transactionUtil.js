import { getByteCount } from '@/assets/util/transactionUtil/transSize.js'
import { getPubkeyArray } from '@/assets/util/keyUtil.js'
import validate from 'bitcoin-address-validation'
import { getTxByHash, decodeRawTransaction } from '@/assets/util/nodeUtil.js'
import { genAddress } from '@/assets/util/addressUtil.js'
import { m, vpubObject } from '@/assets/constants/userConstantFiles.js'
import { testnet } from '@/assets/constants/networkConstants.js'
const R = require('ramda')
const BigNumber = require('bignumber.js')
const bitcoin = require('bitcoinjs-lib')

function decodeRawTransactionBitcoinJS (rawtx) {
  const tx = bitcoin.Transaction.fromHex(rawtx)
  return tx
}

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
// only works with one address, need to distribute to addres array
async function noChange (desiredFeeRate, addressArray, addressArrayAmounts, utxo) {
  const musigTotalNumber = Object.keys(vpubObject).length
  const feeAmountSatoshi = getFeeAmountSatoshi(addressArray, desiredFeeRate, utxo.length,
    musigTotalNumber)
  const getValue = x => new BigNumber(x.value)
  const utxoArray = R.map(getValue, utxo)
  const utxoSum = BigNumber.sum.apply(null, utxoArray)
  const outputsTotal = feeAmountSatoshi
  if (utxoSum.isLessThan(outputsTotal)) {
    throw new Error('Not Enough Funds')
  }
  addressArrayAmounts[0] = utxoSum.minus(outputsTotal)
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

async function formTransactionData (rawTranactionData) {
  const outputArray = getOutputArray(rawTranactionData)
  let updatedTransactionData = await addInputAdressIndex(rawTranactionData)
  updatedTransactionData = await addUnlockingScript(updatedTransactionData)
  return { outputData: outputArray, inputData: updatedTransactionData }
}

async function addUnlockingScript (tranactionData) {
  const updatedTransactionData = R.clone(tranactionData)
  const inputs = tranactionData.transInputs
  for (var i = 0; i < inputs.length; i++) {
    const index = updatedTransactionData.transInputs[i].addressIndex
    const witnessScript = await getUnlockingScript(index)
    updatedTransactionData.transInputs[i].witnessScript = witnessScript
  }
  return updatedTransactionData
}

async function getUnlockingScript (index) {
  const vpubArray = R.values(vpubObject)
  const pubkeyArray = await getPubkeyArray(index, vpubArray)
  const n = pubkeyArray.length
  const network = testnet
  const paymentInfo = await createPayment(`p2wsh-p2ms(${m} of ${n})`, pubkeyArray, network)
  const witness = paymentInfo.payment.redeem.output
  return witness
}

async function createPayment (_type, myKeys, network) {
  const splitType = _type.split('-').reverse()
  const keys = myKeys
  const match = splitType[0].match(/^p2ms\((\d+) of (\d+)\)$/)
  const m = parseInt(match[1])
  let payment
  splitType.forEach(type => {
    if (type.slice(0, 4) === 'p2ms') {
      payment = bitcoin.payments.p2ms({
        m,
        pubkeys: keys,
        network
      })
    } else if (['p2sh', 'p2wsh'].indexOf(type) > -1) {
      payment = bitcoin.payments[type]({
        redeem: payment,
        network
      })
    } else {
      payment = bitcoin.payments[type]({
        pubkey: keys[0],
        network
      })
    }
  })
  return {
    payment,
    keys
  }
}

async function addInputAdressIndex (rawTranactionData) {
  const updatedTransactionData = R.clone(rawTranactionData)
  const inputs = rawTranactionData.transInputs
  for (var i = 0; i < inputs.length; i++) {
    const addressIndex = await findAddressIndex(0, inputs[i].address)
    updatedTransactionData.transInputs[i].addressIndex = addressIndex
  }
  return updatedTransactionData
}

async function findAddressIndex (index, address) {
  const vpubArray = R.values(vpubObject)
  const proposedAdress = await genAddress(index, vpubArray, m)
  if (index > 30) {
    return new Error('Max Index Reached, address not in wallet')
  }
  if (proposedAdress === address) {
    return index
  } else {
    return findAddressIndex(index + 1, address)
  }
}

function getOutputArray (transactioninfo) {
  const addressArray = transactioninfo.addressArray
  const amountArray = transactioninfo.addressArrayAmount
  const outputArray = []
  for (var i = 0; i < addressArray.length; i++) {
    const infoObject = { address: addressArray[i], value: amountArray[i].toFixed() }
    outputArray.push(infoObject)
  }
  return outputArray
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

export {
  getTransactionSize, getScriptPubkey, getTrasactionData,
  noChange, formTransactionData, decodeRawTransactionBitcoinJS
}
