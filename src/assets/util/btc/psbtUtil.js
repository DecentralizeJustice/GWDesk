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

function addInputInfo (psbt, bitcoinjsHex, wrongPsbt) {
  for (var i = 0; i < bitcoinjsHex.ins.length; i++) {
    const transIns = bitcoinjsHex.ins[i]
    const input = {
      hash: transIns.hash,
      index: transIns.index,
      witnessUtxo: {
        script: wrongPsbt.data.inputs[i].witnessUtxo.script,
        value: Number(wrongPsbt.data.inputs[i].witnessUtxo.value)
      }
    }
    psbt.addInput(input)
    const bip32info = wrongPsbt.data.inputs[i].bip32Derivation[0]
    const path = "m/84'/1'/0'/" + bip32info.path.substr(-3)
    const updateData = { bip32Derivation: [{}] }
    updateData.bip32Derivation[0].masterFingerprint = Buffer.from('aeaa2564', 'hex')
    updateData.bip32Derivation[0].path = path
    updateData.bip32Derivation[0].pubkey = bip32info.pubkey
    psbt.updateInput(i, updateData)
    psbt.setInputSequence(i, transIns.sequence)
  }
  return psbt
}

function addOutputInfo (psbt, bitcoinjsHex, wrongPsbt) {
  const network = bitcoin.networks.testnet
  for (var i = 0; i < bitcoinjsHex.outs.length; i++) {
    const transOut = bitcoinjsHex.outs[i]
    const output = {
      address: bitcoin.address.fromOutputScript(transOut.script, network),
      value: Number(transOut.value)
    }
    psbt.addOutput(output)
    const bip32InfoAll = wrongPsbt.data.outputs[i].bip32Derivation
    if (bip32InfoAll !== undefined) {
      const bip32info = bip32InfoAll[0]
      const path = "m/84'/1'/0'/" + bip32info.path.substr(-3)
      const updateData = { bip32Derivation: [{}] }
      updateData.bip32Derivation[0].masterFingerprint = Buffer.from('aeaa2564', 'hex')
      updateData.bip32Derivation[0].path = path
      updateData.bip32Derivation[0].pubkey = bip32info.pubkey
      psbt.updateOutput(i, updateData)
    }
  }
  return psbt
}

export async function createPSBTfromTrans (bitcoinjsHex, wrongPsbt) {
  const network = bitcoin.networks.testnet
  let psbt = new bitcoin.Psbt({ network })
  psbt = addInputInfo(psbt, bitcoinjsHex, wrongPsbt)
  psbt = addOutputInfo(psbt, bitcoinjsHex, wrongPsbt)
  psbt.setVersion(bitcoinjsHex.version)
  // fee snipping not issue yet
  // psbt.setLocktime(bitcoinjsHex.locktime)
  return psbt.toBase64()
}

export async function validPSBTFromPSBT (base64PSBT) {
  const wrongPsbt = bitcoin.Psbt.fromBase64(base64PSBT)
  const buff = Buffer.from(base64PSBT, 'base64')
  const hex = buff.toString('hex')
  const transHex = psbtTools.decodePsbt({ psbt: hex })
  const bitcoinJSTrans = bitcoin.Transaction.fromHex(transHex.unsigned_transaction)
  const finalPSBT64 = await createPSBTfromTrans(bitcoinJSTrans, wrongPsbt)
  // const buff1 = Buffer.from(finalPSBT64, 'base64')
  // const hex1 = buff1.toString('hex')
  // console.log('ran')
  // console.log(psbtTools.decodePsbt({ psbt: hex1 }))
  return finalPSBT64
}
