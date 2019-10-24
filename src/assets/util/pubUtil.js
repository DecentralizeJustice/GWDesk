import { testnet } from '@/assets/constants/networkConstants.js'
const bs58check = require('bs58check')
const bip32 = require('bip32')

function pubToXpub (pub) {
  var data = bs58check.decode(pub)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from('043587cf', 'hex'), data])
  return bs58check.encode(data)
}

async function createXFP (pub) {
  const xpub = pubToXpub(pub)
  const node = await bip32.fromBase58(xpub, testnet)
  const pubBase58 = pubToXpub(node.neutered().toBase58())
  const decoded = bs58check.decode(pubBase58)
  const xfp = decoded.toString('hex').substring(10, 10 + 8).toUpperCase()
  return xfp
}
//
// function pubToVpub (pub) {
//   var data = bs58check.decode(pub)
//   data = data.slice(4)
//   data = Buffer.concat([Buffer.from('02575483', 'hex'), data])
//   return bs58check.encode(data)
// }
export { createXFP, pubToXpub }
