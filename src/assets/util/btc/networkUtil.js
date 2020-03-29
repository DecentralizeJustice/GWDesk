'use strict'
const axios = require('axios')

async function updateTrans (transHex) {
  const newBlob = { trans: transHex }
  const response = await axios({
    method: 'post',
    url: 'https://us-central1-my-project-1506404987940.cloudfunctions.net/updateBlob',
    data: {
      newBlob: newBlob
    }
  })
  return response.data
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
export { updateTrans, getTrans, getFeeInfo, broadcastTrans }
