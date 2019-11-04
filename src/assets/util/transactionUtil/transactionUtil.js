import { getByteCount } from '@/assets/util/transactionUtil/transSize.js'
import validate from 'bitcoin-address-validation'
import { getTxByHash, decodeRawTransaction } from '@/assets/util/nodeUtil.js'
const R = require('ramda')
function getTransactionSize (addressArray, musigNeeded, musigTotal, inputNumber) {
  const inputInfo = {}
  const inputString = 'MULTISIG-P2WSH'.concat(`:${musigNeeded}-${musigTotal}`)
  inputInfo[inputString] = inputNumber

  const addressTypeArray = getAddressTypeArray(addressArray)
  const outputInfo = addToOutPutInfo(addressTypeArray)
  const virtualSize = getByteCount(inputInfo, outputInfo)
  return virtualSize
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

export { getTransactionSize, getScriptPubkey }
