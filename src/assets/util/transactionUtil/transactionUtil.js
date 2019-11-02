import { getByteCount } from '@/assets/util/transactionUtil/transSize.js'
import validate from 'bitcoin-address-validation'
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

export { getTransactionSize }
