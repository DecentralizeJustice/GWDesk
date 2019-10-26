import { client, walletClient } from '@/assets/constants/nodeConstants.js'
import path from 'path'
import { fork } from 'child_process'
const remote = require('electron').remote
const app = remote.app

async function startNode () {
  const location = app.getPath('userData') + '/here'
  const args = [location]
  // eslint-disable-next-line
  const process = fork(path.join(__static, "spvNodeStart.js"), args)
}
async function getNodeInfo () {
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

async function importAddress (account, address, wallet) {
  const result = await wallet.importAddress(account, address)
  return result
}

async function getWalletTransactions (account, maxReturn, from) {
  const result = await walletClient.execute('listtransactions', [account, maxReturn, from, true])
  return result
}

async function getTxByHash (txHash) {
  const result = await client.getTX(txHash)
  return result
}

async function broadcastHex (txHex) {
  const result = await client.broadcast(txHex)
  return result
}

export {
  createWallet, getNodeInfo, getWalletTransactions, broadcastHex,
  getTxByHash, importAddress, startNode
}
