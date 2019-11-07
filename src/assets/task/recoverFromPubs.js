import {
  importAddress, resetChainTo, checkIfNodeMeaningfull,
  getNodeSyncInfo, listWalletAddresses, getWalletTransactions
} from '@/assets/util/nodeUtil.js'

import {
  walletName, oldestBlock, account, gapLimit
} from '@/assets/constants/genConstants.js'

import { m } from '@/assets/constants/userConstantFiles.js'

import {
  genAddress, addressHasTransactions, checkArrayForAddress
} from '@/assets/util/addressUtil.js'
const R = require('ramda')

async function recoverFromPubs (vpubArray) {
  const startingIndex = 0
  const readyNode = await checkIfNodeMeaningfull(oldestBlock)
  if (!readyNode) {
    await pause(10)
    const time = await getNodeSyncInfo()
    console.log('node not ready', time)
    return recoverFromPubs(vpubArray)
  }
  const addressArray = await listWalletAddresses(account, walletName)
  const results = await addAddresses(addressArray, gapLimit, startingIndex, vpubArray)
  return results
}

async function addAddresses (addressArray, limit, index, vpubArray) {
  for (let i = index; i < (limit + index); i++) {
    await addAddress(vpubArray, i)
  }
  const transactionArray = await getWalletTransactions(account, walletName)
  let unusedArray = []
  const nodeSyncStatus = await getNodeSyncInfo()
  const nodeUpToDate = (nodeSyncStatus === 100)
  for (let i = index; i < (limit + index); i++) {
    const address = await genAddress(i, vpubArray, m)
    const addressUsed = await addressHasTransactions(transactionArray, address)
    unusedArray = R.append(addressUsed, unusedArray)
  }
  const finished = R.all(R.equals(false))(unusedArray) && nodeUpToDate
  const allAddressesEmpty = R.all(R.equals(false))(unusedArray)
  if (finished) {
    return true
  } else if (!nodeUpToDate && allAddressesEmpty) {
    await pause(4)
    const updatedAddressArray = await listWalletAddresses(account, walletName)
    console.log('just time')
    return addAddresses(updatedAddressArray, limit, index, vpubArray)
  } else {
    console.log('adding address via recursion')
    const updatedAddressArray = await listWalletAddresses(account, walletName)
    const newIndex = index + 1
    return addAddresses(updatedAddressArray, limit, newIndex, vpubArray)
  }
}

async function addAddress (vpubArray, index) {
  const address = await genAddress(index, vpubArray, m)
  const addressArray = await listWalletAddresses(account, walletName)
  const addressInNode = await checkArrayForAddress(address, addressArray)
  if (!addressInNode) {
    console.log('resetting chain')
    try {
      const result = await importAddress(account, address, walletName)
      await resetChainTo(oldestBlock)
      return result
    } catch (e) {
      await resetChainTo(oldestBlock)
      return { success: true }
    }
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
