
import { testnet } from '@/assets/constants/networkConstants.js'
import { getPubkeyArray } from '@/assets/util/keyUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
import { getTxByHash } from '@/assets/util/nodeUtils/nodeUtil.js'
const bitcoin = require('bitcoinjs-lib')
const R = require('ramda')

async function genAddress (index, vpubArray, m) {
  const network = testnet
  const pubkeys = await getPubkeyArray(index, vpubArray)
  const info = bitcoin.payments.p2wsh({
    network: network,
    redeem: bitcoin.payments.p2ms({ m: m, pubkeys: pubkeys, network: network })
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
async function checkRecTrans (address, transactions) {
  const isRecieve = trans => trans.category === 'receive'
  const hasAddress = trans => trans.address === address
  const recTrans = R.filter(isRecieve, transactions)
  const result = R.any(hasAddress)(recTrans)
  return result
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
export { genAddress, checkArrayForAddress, addressHasTransactions }
