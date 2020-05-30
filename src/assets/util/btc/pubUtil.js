// https://github.com/satoshilabs/slips/blob/master/slip-0132.md
const bs58check = require('bs58check')
// const bip32 = require('bip32')
// const bip39 = require('bip39')

function pubToTpub (pub) {
  var data = bs58check.decode(pub)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from('043587cf', 'hex'), data])
  return bs58check.encode(data)
}
function pubToVpub (pub) {
  var data = bs58check.decode(pub)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from('02575483', 'hex'), data])
  return bs58check.encode(data)
}

export async function getXFP (pub) {
  const decoded = bs58check.decode(pub)
  const xfp = decoded.toString('hex').substring(10, 10 + 8).toUpperCase()
  return xfp
}
//
// async function createRandomXPub (network) {
//   const mnemonic = bip39.generateMnemonic()
//   const seed = bip39.mnemonicToSeedSync(mnemonic)
//   const pub = await bip32.fromSeed(seed, network)
//   var path = "m/41'/1'/0'/0"
//   var child = pub.derivePath(path).neutered().toBase58()
//   return child
// }

//
// function pubToVpub (pub) {
//   var data = bs58check.decode(pub)
//   data = data.slice(4)
//   data = Buffer.concat([Buffer.from('02575483', 'hex'), data])
//   return bs58check.encode(data)
// }
export { pubToTpub, pubToVpub }
