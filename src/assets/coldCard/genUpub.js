const bip32 = require('bip32')
const bip39 = require('bip39')
// const bitcoin = require('bitcoinjs-lib')
const bs58check = require('bs58check')
const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost'
const divPath = "m/48'/1'/0'/2'"
async function getToNode () {
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const node = await bip32.fromSeed(seed)
  const child = await node.derivePath(divPath)
  return child
}
async function genpub () {
  const child = await getToNode()
  return pubToVpub(child.neutered().toBase58())
}
async function genxprv () {
  const child = await getToNode()
  return child.toBase58()
}
async function testXFP () {
  const pub = await genpub()
  const decoded = bs58check.decode(pub)
  const stuff = decoded.toString('hex').substring(10, 10 + 8).toUpperCase()
  return stuff
}
// function pubToXpub (pub) {
//   var data = bs58check.decode(pub)
//   data = data.slice(4)
//   data = Buffer.concat([Buffer.from('0488b21e', 'hex'), data])
//   return bs58check.encode(data)
// }
function pubToVpub (pub) {
  var data = bs58check.decode(pub)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from('02575483', 'hex'), data])
  return bs58check.encode(data)
}
export { genpub, genxprv, testXFP }
