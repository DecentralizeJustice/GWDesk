'use strict'
const bitcoin = require('bitcoinjs-lib')
const NETWORKS = require('./networks')
const bs58check = require('bs58check')
const testnet = NETWORKS.testnet
const coldCardVpub = 'Vpub5nNANYCRfVmfgiGuMVtZQjcjGEfQZobjAYXpyjL1qr6TUpdgmrKRjWUgoFBsB4PNPqzomXsRxePQH23oqi2hYXMtm9zDfEsVQH5WfaQTLad'
const webVpub = 'Vpub5nQxS4k2YAr2CeTKz7Kv5cTDLr8yEnEf4hV2S8xzmaK3ajsAeHAafma9Mtn6in9jykT5KBmDjqvVcjReza2gYpqvv2BHQb2eDgdWtBqqpej'
const vpubArray = [coldCardVpub, webVpub]

async function genAddress (index) {
  const m = 2
  const network = testnet
  let pubkeys = await getPubkeyArray(index)
  pubkeys = sort(pubkeys)
  const info = bitcoin.payments.p2wsh({
    network: network,
    redeem: bitcoin.payments.p2ms({ m: m, pubkeys: pubkeys, network: network })
  })
  return info.address
}

function sort (pubkeyBuffers) {
  const pubkeyHex = []
  for (let i = 0; i < pubkeyBuffers.length; i++) {
    pubkeyHex.push(pubkeyBuffers[i].toString('hex'))
  }
  pubkeyHex.sort()
  const sortedBuffer = []
  for (let i = 0; i < pubkeyHex.length; i++) {
    sortedBuffer.push(Buffer.from(pubkeyHex[i], 'hex'))
  }
  return sortedBuffer
}

async function getPubkeyArray (index) {
  const pubkeyArray = []
  for (var i = 0; i < vpubArray.length; i++) {
    const node = bitcoin.bip32.fromBase58(pubToXpub(vpubArray[i]), testnet)
    const pubkey = node.derive(index).publicKey
    pubkeyArray.push(pubkey)
  }
  const sortedArray = sort(pubkeyArray)
  return sortedArray
}

function pubToXpub (pub) {
  var data = bs58check.decode(pub)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from('043587cf', 'hex'), data])
  return bs58check.encode(data)
}
export { getPubkeyArray, genAddress }
