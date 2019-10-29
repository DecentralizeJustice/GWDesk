import {
  importAddress, resetChainTo,
  getNodeSyncInfo, listWalletAddresses, getWalletTransactions
} from '@/assets/util/nodeUtils/nodeUtil.js'

import {
  walletName, oldestBlock, account, gapLimit, oldestBlockHash
} from '@/assets/constants/genConstants.js'

import { m } from '@/assets/constants/userConstantFiles.js'

import { genAddress, addressHasTransactions, checkArrayForAdress } from '@/assets/util/addressUtil.js'
const R = require('ramda')

async function recoverFromPubs (vpubArray) {
  const startingIndex = 0
  const addressArray = await listWalletAddresses(account, walletName)
  const results = await addAddresses(addressArray, gapLimit, startingIndex, vpubArray)
  return results
}
async function addAddresses (addressArray, limit, index, vpubArray) {
  for (let i = index; i < (limit + index); i++) {
    // console.log(i)
    // await addAddress(vpubArray, i)
  }
  const transactionArray = await getWalletTransactions(account, walletName, oldestBlockHash, walletName)
  let unusedAndCheckedArray = []
  for (let i = index; i < (limit + index); i++) {
    const address = await genAddress(i, vpubArray, m)
    const addressUsed = await addressHasTransactions(transactionArray, address)
    const getStatus = await getNodeSyncInfo()
    const unusedAndChecked = [!addressUsed, (getStatus === 100)]
    unusedAndCheckedArray = R.append(unusedAndChecked, unusedAndCheckedArray)
  }
  const allTrue = R.pipe(R.flatten, R.all(R.equals(true)))(unusedAndCheckedArray)
  const nodeUpToDate = R.pipe(n => n[1], R.all(R.equals(true)))(unusedAndCheckedArray)
  const allAddressesEmpty = R.pipe(n => n[0], R.all(R.equals(false)))(unusedAndCheckedArray)
  const test = [[true, true], [true, false]]
  if (allTrue) {
    return true
  } else if (!nodeUpToDate && allAddressesEmpty) {
    // await pause(2)
    // const updatedAddressArray = await listWalletAddresses(account, walletName)
    // return addAddresses(updatedAddressArray, limit, index, vpubArray)
    console.log('just time')
  } else {
    console.log('add address via recurse')
    // const updatedAddressArray = await listWalletAddresses(account, walletName)
    // const newIndex = index + 1
    // return addAddresses(updatedAddressArray, limit, newIndex, vpubArray)
  }
  return true
}
async function addAddress (vpubArray, index) {
  const address = await genAddress(index, vpubArray, m)
  const addressArray = await listWalletAddresses(account, walletName)
  const addressInNode = await checkArrayForAdress(address, addressArray)
  if (!addressInNode) {
    const result = await importAddress(account, address, walletName)
    await resetChainTo(oldestBlock)
    return result
  }
  return { success: true }
}

async function pause (seconds) {
  return new Promise(resolve =>
    setTimeout(() => resolve(true), seconds * 1000))
}
export {
  recoverFromPubs
}
