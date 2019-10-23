'use strict'
const axios = require('axios')
exports.genAddressUnspent = async function (address) {
  const data =
  await axios(`https://testnet-api.smartbit.com.au/v1/blockchain/address/${address}/unspent`)
  const unspent = data.data.unspent
  return unspent['0']
}
exports.broadcastTrans = async function (transHex) {
  const response = await axios({
    method: 'post',
    url: 'https://testnet-api.smartbit.com.au/v1/blockchain/pushtx',
    data: {
      hex: transHex
    }
  })
  return response.data
}

exports.updateTrans = async function (transHex, index) {
  const response = await axios({
    method: 'post',
    url: 'https://us-central1-my-project-1506404987940.cloudfunctions.net/updateBlob',
    data: {
      newBlob: transHex
    }
  })
  return response.data
}
