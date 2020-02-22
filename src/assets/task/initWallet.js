import store from '../../store/index.js'
import { testnet } from '@/assets/constants/networkConstants.js'
import {
  walletName, oldestBlock, m, gapLimit, changeAccount, receiveAccount
} from '@/assets/constants/genConstants.js'
import {
  importAddress, resetChainTo, checkIfNodeMeaningfull,
  getNodeSyncInfo, listAccountAddresses, getWalletTransactions,
  createWallet, createAccount
} from '@/assets/util/nodeUtil.js'
import { getNextXpub } from '@/assets/util/keyUtil.js'
import {
  genAddress, addressHasTransactions, checkArrayForAddress
} from '@/assets/util/addressUtil.js'
const vpubs = store.getters['userConstants/walletVpubs']
const R = require('ramda')

async function initWallet () {
  await createWalletFunc(walletName, testnet)
  await createAccountFunc(walletName, changeAccount, testnet)
  await createAccountFunc(walletName, receiveAccount, testnet)
  const recAccounts = []
  const changeAccounts = []
  for (var pub of vpubs) {
    recAccounts.push(await getNextXpub(0, pub, testnet))
  }
  for (const pubk of vpubs) {
    changeAccounts.push(await getNextXpub(1, pubk, testnet))
  }
  await recoverAccountFromPubs(changeAccounts, m, gapLimit, changeAccount, walletName, testnet)
  await recoverAccountFromPubs(recAccounts, m, gapLimit, receiveAccount, walletName, testnet)
  return true
}

async function addAddresses (addressArray, gapLimit, index, vpubArray, m, network, account, walletName) {
  try {
    for (let i = index; i < (gapLimit + index); i++) {
      await addAddress(vpubArray, i, m, network, account, walletName)
    }
    const transactionArray = await getWalletTransactions(account, walletName)
    let unusedArray = []
    const nodeSyncStatus = await getNodeSyncInfo()
    const nodeUpToDate = (nodeSyncStatus === 100)
    for (let i = index; i < (gapLimit + index); i++) {
      const address = await genAddress(i, vpubArray, m, network)
      const addressUsed = await addressHasTransactions(transactionArray, address)
      unusedArray = R.append(addressUsed, unusedArray)
    }
    const finished = R.all(R.equals(false))(unusedArray) && nodeUpToDate
    const allGapAddressesEmpty = R.all(R.equals(false))(unusedArray)
    if (finished) {
      return true
    } else if (!nodeUpToDate && allGapAddressesEmpty) {
      await pause(5)
      const updatedAddressArray = await listAccountAddresses(account, walletName)
      console.log('just time')
      return addAddresses(updatedAddressArray, gapLimit, index, vpubArray, m, network, account, walletName)
    } else {
      console.log('adding address via recursion')
      const updatedAddressArray = await listAccountAddresses(account, walletName)
      const newIndex = index + 1
      return addAddresses(updatedAddressArray, gapLimit, newIndex, vpubArray, m, network, account, walletName)
    }
  } catch (e) {
    if (e.message === 'Request timed out.') {
      console.log('timed out')
      await pause(5)
      return addAddresses(addressArray, gapLimit, index, vpubArray, m, network, account, walletName)
    }
    throw (e)
  }
}

async function addAddress (vpubArray, index, m, network, account, walletName) {
  const address = await genAddress(index, vpubArray, m, network)
  const addressArray = await listAccountAddresses(account, walletName)
  const addressInAccount = await checkArrayForAddress(address, addressArray)
  if (!addressInAccount) {
    console.log('resetting chain')
    try {
      const result = await importAddress(account, address, walletName)
      await resetChainTo(oldestBlock)
      return result
    } catch (e) {
      console.log(e)
      if (e.message !== 'Address already exists.') {
        throw (e)
      }
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
async function createWalletFunc (walletName, network) {
  try {
    const results = await createWallet(walletName, network)
    await store.dispatch('userConstants/updateWalletToken', results.token)
  } catch (error) {
    if (error.message !== 'WDB: Wallet already exists.') {
      throw (error)
    }
  }
}
async function recoverAccountFromPubs (vpubArray, m, gapLimit, account, walletName, network) {
  const startingIndex = 0
  const readyNode = await checkIfNodeMeaningfull(oldestBlock)
  if (!readyNode) {
    const time = await getNodeSyncInfo()
    console.log('node not ready', time)
    await pause(10)
    return recoverAccountFromPubs(vpubArray, m, gapLimit, account, walletName, network)
  }
  const addressArray = await listAccountAddresses(account, walletName)
  const results =
  await addAddresses(addressArray, gapLimit, startingIndex, vpubArray, m, network, account, walletName)
  return results
}

async function createAccountFunc (walletName, accountName, network) {
  try {
    await createAccount(walletName, accountName, network)
  } catch (error) {
    if (error.message !== 'Account already exists.') {
      throw (error)
    }
  }
}

export {
  initWallet, recoverAccountFromPubs
}
