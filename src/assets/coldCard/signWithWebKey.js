import { broadcastTrans } from '@/assets/fetch.js'
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost'
const divPath = "m/48'/1'/0'/2'"
const unsignedTrans = '70736274ff010055020000000162817c67b8ba2ab3a009950353f12c5be952f87e96869b76064c59e95ca9a3660000000000ffffffff01301b0f00000000001976a914344a0f48ca150ec2b903817660b9b68b13a6702688ac000000000001012b40420f0000000000220020e031125fc2f2de93eeb26fbd12dbb46a0752866c36c934e8486e3c41d8c1817601054752210272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa052102cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c00165452ae22060272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa0518dffed0153000008001000080000000800200008000000000220602cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c001654186c6816ce30000080010000800000008002000080000000000000'
const coldCardSigned = '70736274ff010055020000000162817c67b8ba2ab3a009950353f12c5be952f87e96869b76064c59e95ca9a3660000000000ffffffff01301b0f00000000001976a914344a0f48ca150ec2b903817660b9b68b13a6702688ac000000000001012b40420f0000000000220020e031125fc2f2de93eeb26fbd12dbb46a0752866c36c934e8486e3c41d8c18176220202cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c00165447304402206beb2f645cd8eec60a73c7b362f9eb0417df167732fbbc4526e75c7c99e445a402206f0fb0f7cbc36446c0ad9c2f964eb339456ce871cfea3ff6cdb65ea9557b84b20101030401000000220602cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c001654186c6816ce300000800100008000000080020000800000000022060272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa0518dffed015300000800100008000000080020000800000000001054752210272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa052102cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c00165452ae0000'
async function getToNode () {
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const node = await bip32.fromSeed(seed)
  const child = await node.derivePath(divPath)
  return child
}
async function genxprv () {
  const child = await getToNode()
  return child
}
async function combineCompletedTrans (hex1, hex2) {
  const signer1 = bitcoin.Psbt.fromHex(hex1)
  const signer2 = bitcoin.Psbt.fromHex(hex2)
  signer1.combine(signer2)
  console.log(signer1.validateSignaturesOfInput(0) === true)
  signer1.finalizeAllInputs()
  const finalHex = signer1.extractTransaction().toHex()
  const broadcast = await broadcastTrans(finalHex)
  return broadcast
}
async function signwithKey () {
  const index = 0
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const node = await bip32.fromSeed(seed)
  const trans = bitcoin.Psbt.fromHex(unsignedTrans)
  const child = await node.derivePath(divPath + '/' + index.toString())
  const webSigned = await trans.signInput(0, child)
  const completeTrans = await combineCompletedTrans(webSigned.toHex(), coldCardSigned)
  return completeTrans
}
export { genxprv, signwithKey }
