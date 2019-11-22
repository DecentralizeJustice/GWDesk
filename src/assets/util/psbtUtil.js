import { getPubkey } from '@/assets/util/keyUtil.js'
import { testnet } from '@/assets/constants/networkConstants.js'
import { divPath } from '@/assets/constants/genConstants.js'
// import { getTxByHash, decodeRawTransaction, getWalletTransactions } from '@/assets/util/nodeUtil.js'
const bitcoin = require('bitcoinjs-lib')

async function createPSBT (transctionData, vpubObject, xfp) {
  const network = testnet
  let psbt = new bitcoin.Psbt({ network: network })
  const transInputs = transctionData.inputData.transInputs
  const outPuts = transctionData.outputData
  for (const index in transInputs) {
    const transInfo = transInputs[index]
    const inputData = getInputData(transInfo)
    psbt.addInput(inputData)
    psbt.setInputSequence(index, 4294967293)
  }
  // psbt.setLocktime(locktime) // next block include random past blockheight
  for (const index in outPuts) {
    psbt.addOutput({
      address: outPuts[index].address,
      value: Number(outPuts[index].value)
    })
  }
  psbt = await addbip32DerivationInfo(psbt, vpubObject, xfp, transInputs)
  // const yes = await decodeRawTransaction(psbt.data.globalMap.unsignedTx.toBuffer().toString('hex'))
  // console.log(psbt.data.globalMap.unsignedTx.toBuffer().toString('hex'))
  const psbtBaseText = psbt.toHex()
  return psbtBaseText
}

async function addbip32DerivationInfo (psbt, vpubObject, xfp, transInputs) {
  for (const index in transInputs) {
    const indexValue = transInputs[index].addressIndex
    psbt = await addKeyInfo(psbt, vpubObject, xfp, indexValue, index)
  }
  return psbt
}

async function addKeyInfo (psbt, vpubObject, xfp, index, i) {
  for (var property1 in vpubObject) {
    const path = divPath + '/' + index.toString()
    const updateData = { bip32Derivation: [{}] }
    updateData.bip32Derivation[0].masterFingerprint = Buffer.from(xfp[property1], 'hex')
    updateData.bip32Derivation[0].path = path
    updateData.bip32Derivation[0].pubkey = await getPubkey(index, vpubObject[property1])
    psbt.updateInput(i, updateData)
  }
  return psbt
}
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
