import { broadcastTrans } from '@/assets/coldCard/fetch.js'

const bitcoin = require('bitcoinjs-lib')

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

export { combineCompletedTrans }
