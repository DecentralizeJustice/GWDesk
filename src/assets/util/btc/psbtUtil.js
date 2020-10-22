// import { getPubkey } from '@/assets/util/btc/keyUtil.js'
import { addressFromScriptPub } from '@/assets/util/btc/addressUtil.js'
// import { testnet } from '@/assets/constants/networkConstants'
const bitcoin = require('bitcoinjs-lib')
const psbtTools = require('psbt')

// export async function createPSBT (transctionData, vpubObject, xfp, network) {
//   let psbt = new bitcoin.Psbt({ network: network })
//   const transInputs = transctionData.inputData.transInputs
//   const outPuts = transctionData.outputData
//   for (const index in transInputs) {
//     const transInfo = transInputs[index]
//     const inputData = getInputData(transInfo)
//     psbt.addInput(inputData)
//     psbt.setInputSequence(index, 4294967293)
//   }
//   // psbt.setLocktime(locktime) // next block include random past blockheight
//   for (const index in outPuts) {
//     psbt.addOutput({
//       address: outPuts[index].address,
//       value: Number(outPuts[index].value)
//     })
//   }
//   psbt = await addbip32DerivationInfo(psbt, vpubObject, xfp, transInputs)
//   // const yes = await decodeRawTransaction(psbt.data.globalMap.unsignedTx.toBuffer().toString('hex'))
//   // console.log(psbt.data.globalMap.unsignedTx.toBuffer().toString('hex'))
//   const psbtBaseText = psbt.toHex()
//   return psbtBaseText
// }

// async function addbip32DerivationInfo (psbt, vpubObject, xfp, transInputs) {
//   for (const index in transInputs) {
//     const indexValue = transInputs[index].addressIndex
//     psbt = await addKeyInfo(psbt, vpubObject, xfp, indexValue, index)
//   }
//   return psbt
// }

// async function addKeyInfo (psbt, vpubObject, xfp, index, i, divPath) {
//   for (var property1 in vpubObject) {
//     const path = divPath + '/' + index.toString()
//     const updateData = { bip32Derivation: [{}] }
//     updateData.bip32Derivation[0].masterFingerprint = Buffer.from(xfp[property1], 'hex')
//     updateData.bip32Derivation[0].path = path
//     updateData.bip32Derivation[0].pubkey = await getPubkey(index, vpubObject[property1])
//     psbt.updateInput(i, updateData)
//   }
//   return psbt
// }
// function getInputData (transInfo) {
//   const amount = transInfo.value
//   const hash = transInfo.hash
//   const index = transInfo.index
//   const script = Buffer.from(
//     transInfo.script, 'hex'
//   )
//   const witnessScript = transInfo.witnessScript
//
//   const witnessUtxo = {
//     script: script,
//     value: amount
//   }
//   const mixin = { witnessUtxo }
//   const mixin2 = {}
//   mixin2.witnessScript = witnessScript
//   return {
//     hash: hash,
//     index: index,
//     ...mixin,
//     ...mixin2
//   }
// }

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
function getWitnessUtxo (index, rawTransaction) {
  const bitcoinJSTrans = bitcoin.Transaction.fromHex(rawTransaction)
  return [bitcoinJSTrans.outs[index].script, bitcoinJSTrans.outs[index].value]
}
function addInputInfo (psbt, bitcoinjsHex, wrongPsbt, decodeElectrumPsbt, masterFingerprint) {
  for (var i = 0; i < decodeElectrumPsbt.inputs.length; i++) {
    const transIns = decodeElectrumPsbt.inputs[i]
    const witnessScript = getWitnessUtxo(transIns.prevout_n, transIns.utxo)
    const input = {
      hash: bitcoinjsHex.ins[i].hash,
      index: transIns.prevout_n,
      witnessUtxo: {
        script: witnessScript[0],
        value: Number(transIns.value_sats)
      },
      // nonWitnessUtxo: Buffer.from(
      //   transIns.utxo,
      //   'hex'
      // ),
      sighashType: 1
    }
    if (Number(transIns.value_sats) !== Number(witnessScript[1])) {
      throw Error('wrong index, bitcoinjsErro')
    }
    psbt.addInput(input)
    const bip32info = wrongPsbt.data.inputs[i].bip32Derivation[0]
    const path = "m/84'/1'/0'/" + bip32info.path.slice(2)
    const updateData = { bip32Derivation: [{}] }
    updateData.bip32Derivation[0].masterFingerprint = Buffer.from(masterFingerprint, 'hex')
    updateData.bip32Derivation[0].path = path
    updateData.bip32Derivation[0].pubkey = bip32info.pubkey
    psbt.updateInput(i, updateData)
    psbt.setInputSequence(i, bitcoinjsHex.ins[i].sequence)
  }
  return psbt
}

function addOutputInfo (psbt, bitcoinjsHex, wrongPsbt, masterFingerprint) {
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
      const path = "m/84'/1'/0'/" + bip32info.path.slice(2)
      const updateData = { bip32Derivation: [{}] }
      updateData.bip32Derivation[0].masterFingerprint = Buffer.from(masterFingerprint, 'hex')
      updateData.bip32Derivation[0].path = path
      updateData.bip32Derivation[0].pubkey = bip32info.pubkey
      psbt.updateOutput(i, updateData)
    }
  }
  return psbt
}

export async function createPSBTfromTrans (bitcoinjsHex, wrongPsbt, decodeElectrumPsbt, masterFingerprint) {
  const network = bitcoin.networks.testnet
  let psbt = new bitcoin.Psbt({ network })
  psbt = addInputInfo(psbt, bitcoinjsHex, wrongPsbt, decodeElectrumPsbt, masterFingerprint)
  psbt = addOutputInfo(psbt, bitcoinjsHex, wrongPsbt, masterFingerprint)
  psbt.setVersion(bitcoinjsHex.version)
  // fee snipping not issue yet
  // psbt.setLocktime(bitcoinjsHex.locktime)
  return psbt.toBase64()
}

export async function validPSBTFromPSBT (base64PSBT, decodeElectrumPsbt, masterFingerprint) {
  const wrongPsbt = bitcoin.Psbt.fromBase64(base64PSBT)
  const buff = Buffer.from(base64PSBT, 'base64')
  const hex = buff.toString('hex')
  const transHex = psbtTools.decodePsbt({ psbt: hex })
  const bitcoinJSTrans = bitcoin.Transaction.fromHex(transHex.unsigned_transaction)
  const finalPSBT64 = await createPSBTfromTrans(bitcoinJSTrans, wrongPsbt, decodeElectrumPsbt, masterFingerprint)
  return finalPSBT64
}
export async function decodeElectrumPsbt (base64PSBT, decodedElectrumPsbt) {
  const network = bitcoin.networks.testnet
  const bigNum = 100000000
  const transObject = {}
  transObject.inputSum = 0
  transObject.changeAmount = 0
  transObject.feeAmount = 0
  transObject.totalOutputs = 0
  transObject.addressArray = []
  transObject.amountArray = []
  transObject.changeIndex = undefined
  const wrongPsbt = bitcoin.Psbt.fromBase64(base64PSBT)
  const buff = Buffer.from(base64PSBT, 'base64')
  const hex = buff.toString('hex')
  const transHex = psbtTools.decodePsbt({ psbt: hex })
  const bitcoinJSTrans = bitcoin.Transaction.fromHex(transHex.unsigned_transaction)
  const inputs = decodedElectrumPsbt.inputs
  for (let i = 0; i < inputs.length; i++) {
    const inputValue = (inputs[i].value_sats / bigNum)
    transObject.inputSum = inputValue + transObject.inputSum
  }
  for (let i = 0; i < wrongPsbt.data.outputs.length; i++) {
    transObject.totalOutputs += (bitcoinJSTrans.outs[i].value / bigNum)
    if (wrongPsbt.data.outputs[i].bip32Derivation !== undefined) {
      transObject.changeAmount += (bitcoinJSTrans.outs[i].value / bigNum)
      transObject.changeIndex = i
    }
  }
  transObject.feeAmount = Number((transObject.inputSum - transObject.totalOutputs).toFixed(8))
  for (var i = 0; i < bitcoinJSTrans.outs.length; i++) {
    const address = await addressFromScriptPub(bitcoinJSTrans.outs[i].script, network)
    const amount = (bitcoinJSTrans.outs[i].value / bigNum)
    transObject.addressArray.push(address)
    transObject.amountArray.push(amount)
  }
  return transObject
}
