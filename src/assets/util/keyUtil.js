
import { testnet } from '@/assets/constants/networkConstants.js'
import { pubToXpub } from '@/assets/util/pubUtil.js'
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

async function getPubkeyArray (index, vpubArray) {
  const pubkeyArray = []
  for (var i = 0; i < vpubArray.length; i++) {
    const node = bitcoin.bip32.fromBase58(pubToXpub(vpubArray[i]), testnet)
    const pubkey = node.derive(index).publicKey
    pubkeyArray.push(pubkey)
  }
  const sortedArray = sort(pubkeyArray)
  return sortedArray
}

export { getPubkeyArray }
