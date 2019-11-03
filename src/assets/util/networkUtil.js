'use strict'
const axios = require('axios')
async function genAddressUnspent (address) {
  const data =
  await axios(`https://testnet-api.smartbit.com.au/v1/blockchain/address/${address}/unspent`)
  const unspent = data.data.unspent
  return unspent['0']
}
async function broadcastTrans (transHex) {
  const response = await axios({
    method: 'post',
    url: 'https://testnet-api.smartbit.com.au/v1/blockchain/pushtx',
    data: {
      hex: transHex
    }
  })
  return response.data
}

async function updateTrans (transHex, index) {
  const newBlob = { trans: transHex, index: index }
  const response = await axios({
    method: 'post',
    url: 'https://us-central1-my-project-1506404987940.cloudfunctions.net/updateBlob',
    data: {
      newBlob: newBlob
    }
  })
  return response.data
}

async function getTrans () {
  const response = await axios({
    method: 'get',
    url: 'https://us-central1-my-project-1506404987940.cloudfunctions.net/getBlob'
  })
  return response.data
}
async function getFeeInfo () {
  const response = await axios({
    method: 'get',
    url: 'https://api.blockcypher.com/v1/btc/test3'
  })
  return response.data
}
export { updateTrans, broadcastTrans, genAddressUnspent, getTrans, getFeeInfo }
