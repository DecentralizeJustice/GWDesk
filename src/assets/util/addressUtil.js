
import { testnet } from '@/assets/constants/networkConstants.js'
import { getPubkeyArray } from '@/assets/util/keyUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
import { getTxByHash } from '@/assets/util/nodeUtil.js'
const BigNumber = require('bignumber.js')
const bitcoin = require('bitcoinjs-lib')
const R = require('ramda')

async function genAddress (index, vpubArray, m) {
  const network = testnet
  const pubkeys = await getPubkeyArray(index, vpubArray)
  const scriptInfo = { m: m, pubkeys: pubkeys, network: network }
  const info = bitcoin.payments.p2wsh({
    network: network,
    redeem: bitcoin.payments.p2ms(scriptInfo)
  })
  return info.address
}
async function checkArrayForAddress (address, addressArray) {
  const inOrNot = R.any(R.equals(address))(addressArray)
  return inOrNot
}
async function addressHasTransactions (transactions, address) {
  const recPresent = await checkRecTrans(address, transactions)
  if (recPresent) {
    return true
  }
  const sentPresent = await checkSentTrans(address, transactions)
  if (sentPresent) {
    return true
  } else {
    return false
  }
}
async function getReceiveAddress (index, transactions, vpubArray, m) {
  const address = await genAddress(index, vpubArray, m)
  const sentPresent = await checkSentTrans(address, transactions)
  if (sentPresent) {
    const nextIndex = index + 1
    return getReceiveAddress(nextIndex, transactions, vpubArray, m)
  } else {
    return address
  }
}
async function getReceiveIndex (index, transactions, vpubArray, m) {
  const address = await genAddress(index, vpubArray, m)
  const sentPresent = await checkSentTrans(address, transactions)
  if (sentPresent) {
    const nextIndex = index + 1
    return getReceiveIndex(nextIndex, transactions, vpubArray, m)
  } else {
    return index
  }
}
async function getChangeAddress (index, transactions, vpubArray, m, wouldBeChnage) {
  const address = await genAddress(index, vpubArray, m)
  const sentPresent = await checkSentTrans(address, transactions)
  const noSentAndIsChange = sentPresent && wouldBeChnage
  if (sentPresent) {
    const nextIndex = index + 1
    return getReceiveAddress(nextIndex, transactions, vpubArray, m, wouldBeChnage)
  } else if (noSentAndIsChange) {
    return address
  } else {
    const flipToChange = true
    const nextIndex = index + 1
    return getReceiveAddress(nextIndex, transactions, vpubArray, m, flipToChange)
  }
}
async function getReceivedCoins (address, transactions) {
  const isRecieve = trans => trans.category === 'receive'
  const involvesAddress = trans => trans.address === address
  const getAmount = trans => trans.amount.toString()
  const sumBigNums = (bigNum1, bigNum2) => bigNum1.plus(bigNum2)
  const toBigNum = num => (new BigNumber(num)).shiftedBy(8)
  const recTrans = R.filter(isRecieve, transactions)
  const involedTrans = R.filter(involvesAddress)(recTrans)
  const amountArray = R.map(getAmount, involedTrans)
  const bigNumBalances = R.map(toBigNum, amountArray)
  const zeroBigNum = new BigNumber(0)
  const sum = R.reduce(sumBigNums, zeroBigNum, bigNumBalances)
  return sum
}
async function checkRecTrans (address, transactions) {
  const isRecieve = trans => trans.category === 'receive'
  const hasAddress = trans => trans.address === address
  const recTrans = R.filter(isRecieve, transactions)
  const result = R.any(hasAddress)(recTrans)
  return result
}
async function getRecTrans (address, transactions) {
  const isRecieve = trans => trans.category === 'receive'
  const hasAddress = trans => trans.address === address
  const recTrans = R.filter(isRecieve, transactions)
  const recToAddress = R.filter(hasAddress, recTrans)
  return recToAddress
}
async function checkSentTrans (address, transactions) {
  let transDetails = []
  const isSent = trans => trans.category === 'send'
  const sendTrans = R.filter(isSent, transactions)
  const getTransHash = async trans => {
    const transInfo = await getTxByHash(trans.txid, walletName)
    transDetails = R.append(transInfo, transDetails)
  }
  for (const trans of sendTrans) {
    await getTransHash(trans)
  }
  const justInputs = R.chain(trans => trans.inputs, transDetails)
  const involvedAdresses = R.chain(inputs => inputs.address, justInputs)
  const results = R.any(R.equals(address))(involvedAdresses)
  return results
}
export {
  genAddress, checkArrayForAddress, addressHasTransactions, getReceivedCoins,
  getReceiveAddress, getRecTrans, getChangeAddress, getReceiveIndex
}
