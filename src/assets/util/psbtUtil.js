import { getPubkey } from '@/assets/util/keyUtil.js'
import { testnet } from '@/assets/constants/networkConstants.js'
import { divPath } from '@/assets/constants/genConstants.js'
const bitcoin = require('bitcoinjs-lib')
// const R = require('ramda')

async function createPSBT (transctionData, vpubObject, xfp) {
  const network = testnet
  const psbt = new bitcoin.Psbt({ network: network })
  const transInputs = transctionData.inputData.transInputs
  const outPuts = transctionData.outputData
  for (let i = 0; i < transInputs.length; i++) {
    const transInfo = transInputs[i]
    const inputData = getInputData(transInfo)
    psbt.addInput(inputData)
  }
  for (let i = 0; i < outPuts.length; i++) {
    psbt.addOutput({
      address: outPuts[i].address,
      value: Number(outPuts[i].value)
    })
  }
  // psbt = await addbip32DerivationInfo(psbt, vpubObject, xfp)
  const psbtBaseText = psbt.toHex()
  return psbtBaseText
}

// async function addbip32DerivationInfo (psbt, vpubObject, xfp) {
//   for (var property1 in vpubObject) {
//     const path = divPath + '/' + index.toString()
//     const updateData = { bip32Derivation: [{}] }
//     updateData.bip32Derivation[0].masterFingerprint = Buffer.from(xfp[property1], 'hex')
//     updateData.bip32Derivation[0].path = path
//     updateData.bip32Derivation[0].pubkey = await getPubkey(index, vpubObject[property1])
//     psbt.updateInput(0, updateData)
//   }
//   return psbt
// }

function getInputData (transInfo) {
  const amount = transInfo.value
  const hash = transInfo.hash
  const index = transInfo.index
  const script = Buffer.from(
    transInfo.script, 'hex'
  )
  const witnessScript = transInfo.witnessScript

  const witnessUtxo = {
    script: script,
    value: amount
  }
  const mixin = { witnessUtxo }
  const mixin2 = {}
  const redeemType = 'p2wsh'
  switch (redeemType) {
    case 'p2wsh':
      mixin2.witnessScript = witnessScript
      break
  }
  return {
    hash: hash,
    index: index,
    ...mixin,
    ...mixin2
  }
}

async function combineCompletedTrans (hex1, hex2) {
  const signer1 = bitcoin.Psbt.fromHex(hex1)
  const signer2 = bitcoin.Psbt.fromHex(hex2)
  signer1.combine(signer2)
  console.log(signer1.validateSignaturesOfInput(0) === true)
  signer1.finalizeAllInputs()
  const finalHex = signer1.extractTransaction().toHex()
  return finalHex
}

export { createPSBT, combineCompletedTrans }
