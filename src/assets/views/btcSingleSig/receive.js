import { pubToTpub } from '@/assets/util/btc/pubUtil.js'
const bitcoin = require('bitcoinjs-lib')
const bip32 = require('bip32')
const network = bitcoin.networks.testnet
function getAddress (xpub, internal, index) {
  const newPub = pubToTpub(xpub)
  const address =
  bitcoin.payments.p2wpkh({
    pubkey: bip32
      .fromBase58(newPub, network)
      .derive(internal)
      .derive(index).publicKey,
    network: network
  })
  return address.address
}

export function findPath (xpub, address, addressListLength) {
  let testAddress
  for (var i = 0; i < addressListLength; i++) {
    testAddress = getAddress(xpub, 0, i)
    if (testAddress === address) {
      return i
    }
  }
  throw new Error('Address Dosent Belong To This Path')
}
