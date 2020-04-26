import { getPubkey } from '@/assets/util/btc/keyUtil.js'
// import { testnet } from '@/assets/constants/networkConstants'
const bitcoin = require('bitcoinjs-lib')
const psbtTools = require('psbt')

export async function createPSBT (transctionData, vpubObject, xfp, network) {
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

async function addKeyInfo (psbt, vpubObject, xfp, index, i, divPath) {
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

export async function combineCompletedTrans (hex1, hex2) {
  const signer1 = bitcoin.Psbt.fromHex(hex1)
  const signer2 = bitcoin.Psbt.fromHex(hex2)
  signer1.combine(signer2)
  console.log(signer1.validateSignaturesOfInput(0) === true)
  signer1.finalizeAllInputs()
  const finalHex = signer1.extractTransaction().toHex()
  return finalHex
}

export async function finalizeTrans (base64Trans) {
  const psbt = bitcoin.Psbt.fromBase64(base64Trans)
  // console.log(signer1.validateSignaturesOfInput(0) === true)
  psbt.finalizeAllInputs()
  const finalHex = psbt.extractTransaction().toHex()
  return finalHex
}

export async function addInfo (psbt) {
  const path = "m/84'/1'/0'/0/0"
  const updateData = { bip32Derivation: [{}] }
  updateData.bip32Derivation[0].masterFingerprint = Buffer.from('aeaa2564', 'hex')
  updateData.bip32Derivation[0].path = path
  updateData.bip32Derivation[0].pubkey = Buffer.from('03170b359019ab3e1790595b6bb282668fac8416b1be1c5f984175da84ef6c4c06', 'hex')
  psbt.updateInput(0, updateData)
  return psbt
}

export async function bitcoinjsTransToPSBT (bitcoinjsTX) {
  return bitcoinjsTX
}

export async function createPSBTfromTrans (transactionHex, hex) {
  const network = bitcoin.networks.testnet
  const transIns = transactionHex.ins[0]
  const transOut = transactionHex.outs[0]
  // console.log(transOut)
  const input = {
    hash: transIns.hash,
    index: 0,
    witnessUtxo: {
      script: Buffer.from(
        hex.inputs[0].witness_utxo.script_pub,
        'hex'),
      value: Number(hex.inputs[0].witness_utxo.tokens)
    }
  }
  // console.log(transactionHex.outs[0].script.toString('hex'))
  // console.log(bitcoin.address.fromOutputScript(input.witnessUtxo.script, network))
  // console.log(input.witnessUtxo.script.toString('hex'))
  let psbt = new bitcoin.Psbt({ network })
    .addInput(input)
    .addOutput({
      address: bitcoin.address.fromOutputScript(transactionHex.outs[0].script, network),
      value: Number(transOut.value)
    })
  psbt = await addInfo(psbt)
  // const transHex = psbtTools.decodePsbt({ psbt: psbt.toHex() })
  // console.log(transHex)
  // console.log(psbt.toBase64())
  return psbt.toHex()
}

export async function transactionFromPSBT (base64PSBT) {
  const buff = Buffer.from(base64PSBT, 'base64')
  const hex = buff.toString('hex')
  const transHex = psbtTools.decodePsbt({ psbt: hex })
  console.log(transHex)
  const bitcoinJSTrans = bitcoin.Transaction.fromHex(transHex.unsigned_transaction)
  console.log(bitcoinJSTrans)
  return createPSBTfromTrans(bitcoinJSTrans, transHex)
}
