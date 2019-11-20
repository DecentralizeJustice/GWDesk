import { getByteCount } from '@/assets/util/transactionUtil/transSize.js'
import { getPubkeyArray } from '@/assets/util/keyUtil.js'
import validate from 'bitcoin-address-validation'
import { getTxByHash, decodeRawTransaction, getWalletTransactions } from '@/assets/util/nodeUtil.js'
import { genAddress, getReceiveAddress, getChangeAddress } from '@/assets/util/addressUtil.js'
import { m, vpubObject } from '@/assets/constants/userConstantFiles.js'
import { testnet } from '@/assets/constants/networkConstants.js'
const R = require('ramda')
const BigNumber = require('bignumber.js')
const bitcoin = require('bitcoinjs-lib')

function decodeRawTransactionBitcoinJS (rawtx) {
  const tx = bitcoin.Transaction.fromHex(rawtx)
  return tx
}

function
getTransactionSize (addressArray, musigNeeded, musigTotal, inputNumber) {
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

async function
noChange (desiredFeeRate, addressArray, addressArrayAmounts, utxo) {
  const musigTotalNumber = Object.keys(vpubObject).length
  const feeAmountSatoshi = getFeeAmountSatoshi(addressArray,
    desiredFeeRate, utxo.length, musigTotalNumber)
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

async function getTrasactionData (addressArray, addressArrayAmount, utxo,
  targetFeeRatio) {
  const musigTotalNumber = Object.keys(vpubObject).length
  const fifoCoins = R.sortBy(R.prop('height'))(utxo)
  const totalOutputsAmountNeeded = BigNumber.sum.apply(null, addressArrayAmount)

  const totalOutputsPossible = checkIfEnoughFunds(fifoCoins,
    totalOutputsAmountNeeded)

  if (!totalOutputsPossible) { throw new Error('Not Enough Funds') }

  const [inputSumPostOutputs, inputsArrayPostOutputs, utxoPostOutputs] =
    addNeededUtxo(new BigNumber(0), totalOutputsAmountNeeded, fifoCoins, [])

  const noChangeFeeAmountSatoshi =
    getFeeAmountSatoshi(addressArray, targetFeeRatio,
      inputsArrayPostOutputs.length, musigTotalNumber)

  const minFees = noChangeFeeAmountSatoshi
  const totalOutputsPossibleWithFees =
    checkIfEnoughFunds(utxoPostOutputs, minFees)
  const changeExist = inputSumPostOutputs.isGreaterThan(minFees)

  if (!totalOutputsPossibleWithFees && !changeExist) {
    throw new Error('Not Enough Funds')
  }
  const feeAndUTXONeeded = minFees.plus(totalOutputsAmountNeeded)

  const [inputSumPostFee, inputsArrayPostFee, utxoPostFee] =
  addNeededUtxo(inputSumPostOutputs, feeAndUTXONeeded, utxoPostOutputs,
    inputsArrayPostOutputs)

  const change = inputSumPostFee.minus(feeAndUTXONeeded)
  const changeAddressArray = creatChangeArray(addressArray)
  const changeFeeAmountSatoshi =
    getFeeAmountSatoshi(changeAddressArray, targetFeeRatio,
      inputsArrayPostFee.length, musigTotalNumber)
  const costToKeepChange =
    changeFeeAmountSatoshi.minus(noChangeFeeAmountSatoshi)

  if (costToKeepChange.isGreaterThan(change)) {
    const changeAmount = new BigNumber(0)
    const inputs = inputsArrayPostFee
    const feeAmount = change.plus(minFees)
    const transactionSize =
      getTransactionSize(addressArray, m, musigTotalNumber,
        inputsArrayPostFee.length)
    const remainingUtxo = utxoPostFee
    const proposedTransaction =
      { changeAmount, inputs, feeAmount, transactionSize, remainingUtxo }
    return proposedTransaction
  } else {
    const feeAmount = changeFeeAmountSatoshi
    const changeAmount = change.minus(costToKeepChange)
    const inputs = inputsArrayPostFee
    const transactionSize =
      getTransactionSize(changeAddressArray, m, musigTotalNumber,
        inputsArrayPostFee.length)
    const remainingUtxo = utxoPostFee
    const proposedTransaction =
      { changeAmount, inputs, feeAmount, transactionSize, remainingUtxo }
    return proposedTransaction
  }
}

async function getChangeCorrectAddress (inputsArray) {
  const vpubArray = R.values(vpubObject)
  const transactions = await getWalletTransactions('default', 'musig')
  const currentRecieveAddress = await getReceiveAddress(0, transactions, vpubArray, m)
  const getAddress = n => n.address === currentRecieveAddress
  const involvesRecieveAddress = R.filter(getAddress, inputsArray).length > 0
  if (involvesRecieveAddress) {
    const proposedChangeAddress = await getChangeAddress(0, transactions, vpubArray, m, false)
    return proposedChangeAddress
  } else {
    return currentRecieveAddress
  }
}

function addNeededUtxo (currentInputSum, totalOutputsAmountNeeded, fifoUtxo,
  inputsArray) {
  while (currentInputSum.isLessThan(totalOutputsAmountNeeded)) {
    if (R.isEmpty(fifoUtxo)) {
      throw new Error('Not Enough Funds')
    }
    inputsArray = R.append(fifoUtxo[0], inputsArray)
    currentInputSum =
        currentInputSum.plus(new BigNumber(fifoUtxo[0].value))
    fifoUtxo = R.drop(1, fifoUtxo)
  }
  return [currentInputSum, inputsArray, fifoUtxo]
}

function creatChangeArray (addressArray) {
  const changeArray =
  R.append('tb1qfhswexghg04qj74dw6rl53ejtlvwfycsveqq0fegfvcz5ssk3jdsp32rme',
    addressArray)
  return changeArray
}

async function formTransactionData (tranactionDataOG) {
  const tranactionData = R.clone(tranactionDataOG)
  const changeAmountToAdd = tranactionData.change
  if (!changeAmountToAdd.isZero()) {
    const changeAddress = await
    getChangeCorrectAddress(tranactionData.transInputs)
    tranactionData.addressArray.push(changeAddress)
    tranactionData.addressArrayAmount.push(changeAmountToAdd)
  }
  const outputArray = getOutputArray(tranactionData)
  let updatedTransactionData = await addInputAdressIndex(tranactionData)
  updatedTransactionData = await addUnlockingScript(updatedTransactionData)
  return { outputData: outputArray, inputData: updatedTransactionData }
}

async function addUnlockingScript (tranactionData) {
  const updatedTransactionData = R.clone(tranactionData)
  const inputs = tranactionData.transInputs
  for (const index in inputs) {
    const adressIndex = updatedTransactionData.transInputs[index].addressIndex
    const witnessScript = await getUnlockingScript(adressIndex)
    updatedTransactionData.transInputs[index].witnessScript = witnessScript
  }
  return updatedTransactionData
}

async function getUnlockingScript (index) {
  const vpubArray = R.values(vpubObject)
  const pubkeyArray = await getPubkeyArray(index, vpubArray)
  const n = pubkeyArray.length
  const network = testnet
  const paymentInfo = await createPayment(`p2wsh-p2ms(${m} of ${n})`,
    pubkeyArray, network)
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
  for (const index in inputs) {
    const addressIndex = await findAddressIndex(0, inputs[index].address)
    updatedTransactionData.transInputs[index].addressIndex = addressIndex
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
    const infoObject =
      {
        address: addressArray[i], value: amountArray[i].toFixed()
      }
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
  const transSizeVBtyes = getTransactionSize(addressArray, m,
    musigTotalNumber, inputNumber)
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
  noChange, formTransactionData, decodeRawTransactionBitcoinJS,
  getChangeCorrectAddress
}
