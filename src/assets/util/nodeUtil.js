import { client, walletClient } from '@/assets/constants/nodeConstants.js'
import { minConfirmations } from '@/assets/constants/genConstants.js'
import { getFeeInfo } from '@/assets/util/networkUtil.js'
import path from 'path'
import { fork } from 'child_process'
const remote = require('electron').remote
const app = remote.app
const R = require('ramda')

async function startNode () {
  const location = app.getPath('userData') + '/here'
  const args = [location]
  // eslint-disable-next-line
  const process = fork(path.join(__static, "spvNodeStart.js"), args)
  return true
}
async function checkNodeAlive () {
  try {
    await client.getInfo()
    return true
  } catch (error) {
    return false
  }
}
async function getNodeInfo () {
  const results = await client.getInfo()
  return results
}
async function stopNode () {
  // eslint-disable-next-line
  const pathTo = path.join(__static, "killNode.js")
  await fork(pathTo)
  return true
}
async function resetChainTo (resetToHeight) {
  const currentNodeHeight = await getNodeHeight()
  if (currentNodeHeight > resetToHeight) {
    const result = await client.reset(resetToHeight)
    return result
  } else {
    return { successt: true }
  }
}

async function getNodeHeight () {
  const clientinfo = await client.getInfo()
  const height = clientinfo.chain.height
  return height
}

async function getNodeSyncInfo () {
  const clientinfo = await client.getInfo()
  const percentage = clientinfo.chain.progress * 100
  return percentage
}

async function createWallet (id) {
  const accountKey = 'tpubDDF921KoqbemP3yPiBMBzvkDY5pe4KpirJtXtSaTdRkZ3LyqorrHy1mv1XLNqrmTQQXztdTQiZxDtPxGZ9Lmiqtv8wJYJs5o52J54djLpqC'
  const options = {
    watchOnly: true,
    accountKey: accountKey
  }
  const result = await walletClient.createWallet(id, options)
  return result
}

async function importAddress (account, address, id) {
  const wallet = walletClient.wallet(id)
  const result = await wallet.importAddress(account, address)
  return result
}
async function getUTXO (id) {
  const wallet = walletClient.wallet(id)
  const result = await wallet.getCoins()
  return result
}

async function getWalletTransactions (account, name) {
  const minConfirmationsMet = trans => (trans.confirmations >= minConfirmations)
  await walletClient.execute('selectwallet', [name])
  const accountIndex = 0
  const transAray = []
  const returnAmount = 20
  async function transLoop (transAray, accountIndex) {
    let index = accountIndex
    let array = transAray
    const transInfo = await walletClient.execute('listtransactions', [account, returnAmount, index, true])
    array = R.concat(array, transInfo)
    if (transInfo.length < returnAmount) {
      return array
    } else {
      index += returnAmount
      return transLoop(array, index)
    }
  }
  const finalArray = await transLoop(transAray, accountIndex)
  const result = R.filter(minConfirmationsMet, finalArray)
  return result
}
async function listWalletAddresses (account, name) {
  await walletClient.execute('selectwallet', [name])
  // eslint-disable-next-line
  const result = await walletClient.execute('getaddressesbyaccount', [account])
  // console.log(result)
  return result
}
async function getFeeEstimate (blocks) {
  // eslint-disable-next-line
  const result = await getFeeInfo()
  return result
}
async function getTxByHash (txHash, id) {
  const wallet = walletClient.wallet(id)
  const result = await wallet.getTX(txHash)
  return result
}
async function decodeRawTransaction (transHex) {
  const result = await client.execute('decoderawtransaction', [transHex])
  return result
}
async function checkIfNodeMeaningfull (desiredBlockHeight) {
  const currentNodeHeight = await getNodeHeight()
  if (currentNodeHeight < desiredBlockHeight) {
    return false
  } else {
    return true
  }
}

async function broadcastHex (txHex) {
  const result = await client.broadcast(txHex)
  return result
}

export {
  createWallet, getNodeSyncInfo, getWalletTransactions, broadcastHex,
  getTxByHash, importAddress, startNode, checkNodeAlive, stopNode, resetChainTo,
  getNodeInfo, listWalletAddresses, checkIfNodeMeaningfull, getFeeEstimate,
  decodeRawTransaction, getUTXO
}
