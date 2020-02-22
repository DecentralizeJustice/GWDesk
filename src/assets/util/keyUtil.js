
// import { testnet } from '@/assets/constants/networkConstants.js'
import { pubToTpub } from '@/assets/util/pubUtil.js'
const bitcoin = require('bitcoinjs-lib')

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
async function getNextXpub (nodeIndex, pub, network) {
  const node = bitcoin.bip32.fromBase58(pubToTpub(pub), network)
  const xpub = node.derivePath(nodeIndex.toString()).toBase58()
  return xpub
}
async function getPubkey (index, vpub, network) {
  const node = bitcoin.bip32.fromBase58(pubToTpub(vpub), network)
  const pubkey = node.derive(index).publicKey
  return pubkey
}

async function getPubkeyArray (index, vpubArray, network) {
  const pubkeyArray = []
  for (var i = 0; i < vpubArray.length; i++) {
    const pubkey = await getPubkey(index, vpubArray[i], network)
    pubkeyArray.push(pubkey)
  }
  const sortedArray = sort(pubkeyArray)
  return sortedArray
}

export { getPubkeyArray, getPubkey, getNextXpub }
