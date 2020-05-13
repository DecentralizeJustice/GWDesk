import { getPubkeyArray } from '@/assets/util/btc/keyUtil.js'
const BigNumber = require('bignumber.js')
const bitcoin = require('bitcoinjs-lib')
const R = require('ramda')

async function genAddress (index, vpubArray, m, network) {
  const pubkeys = await getPubkeyArray(index, vpubArray, network)
  const scriptInfo = { m: m, pubkeys: pubkeys, network: network }
  const info = bitcoin.payments.p2wsh({
    network: network,
    redeem: bitcoin.payments.p2ms(scriptInfo)
  })
  return info.address
}

async function addressFromScriptPub (scriptBuffer, network) {
  const address = bitcoin.address.fromOutputScript(scriptBuffer, network)
  return address
}
async function checkArrayForAddress (address, addressArray) {
  const inOrNot = R.any(R.equals(address))(addressArray)
  return inOrNot
}
async function getReceiveAddress (index, transactions, vpubArray, m, network) {
  const address = await genAddress(index, vpubArray, m, network)
  const sentPresent = await checkRecTrans(address, transactions)
  if (sentPresent) {
    const nextIndex = index + 1
    return getReceiveAddress(nextIndex, transactions, vpubArray, m, network)
  } else {
    return address
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
async function getReceivedTransactions (address, transactions) {
  const isRecieve = trans => trans.category === 'receive'
  const involvesAddress = trans => trans.address === address
  const recTrans = R.filter(isRecieve, transactions)
  const involedTrans = R.filter(involvesAddress)(recTrans)
  return involedTrans
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
export {
  genAddress, checkArrayForAddress, getReceivedCoins,
  getReceiveAddress, getRecTrans,
  getReceivedTransactions, addressFromScriptPub
}
