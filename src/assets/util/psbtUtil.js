import { getPubkeyArray, getPubkey } from '@/assets/util/keyUtil.js'
import { testnet } from '@/assets/constants/networkConstants.js'
import { divPath } from '@/assets/constants/genConstants.js'
const bitcoin = require('bitcoinjs-lib')
const R = require('ramda')

async function createPSBT (index, m, vpubObject, xfp, fees, transInfo) {
  const vpubArray = R.values(vpubObject)
  const path = divPath + '/' + index.toString()
  const pubkeyArray = await getPubkeyArray(index, vpubArray)
  const n = pubkeyArray.length
  const network = testnet
  // const address = await genAddress(index, vpubArray, m)
  const p2wsh = await createPayment(`p2wsh-p2ms(${m} of ${n})`, pubkeyArray, network)
  // const transInfo = await genAddressUnspent(address)
  const inputData = await getInputData(p2wsh.payment, 'p2wsh', transInfo)
  const spendable = transInfo.value_int
  const totalToSend = spendable - fees
  let psbt = new bitcoin.Psbt({ network: network })
    .addInput(inputData)
    .addOutput({
      address: 'mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt',
      value: totalToSend
    })
  psbt = await addbip32DerivationInfo(psbt, path, vpubObject, xfp, index)
  const psbtBaseText = psbt.toHex()
  return psbtBaseText
}

async function addbip32DerivationInfo (psbt, path, vpubObject, xfp, index) {
  for (var property1 in vpubObject) {
    const updateData = { bip32Derivation: [{}] }
    updateData.bip32Derivation[0].masterFingerprint = Buffer.from(xfp[property1], 'hex')
    updateData.bip32Derivation[0].path = path
    updateData.bip32Derivation[0].pubkey = await getPubkey(index, vpubObject[property1])
    psbt.updateInput(0, updateData)
  }
  return psbt
}

async function createPayment (_type, myKeys, network) {
  const splitType = _type.split('-').reverse()
  const keys = myKeys
  const match = splitType[0].match(/^p2ms\((\d+) of (\d+)\)$/)
  const m = parseInt(match[1])
  const n = parseInt(match[2])
  if (keys.length > 0 && keys.length !== n) {
    throw new Error('Need n keys for multisig')
  }
  let payment
  splitType.forEach(type => {
    if (type.slice(0, 4) === 'p2ms') {
      payment = bitcoin.payments.p2ms({
        m,
        pubkeys: keys,
        network
      })
    } else if (['p2sh', 'p2wsh'].indexOf(type) > -1) {
      payment = bitcoin.payments[type]({
        redeem: payment,
        network
      })
    } else {
      payment = bitcoin.payments[type]({
        pubkey: keys[0],
        network
      })
    }
  })
  return {
    payment,
    keys
  }
}
function getInputData (payment, redeemType, transInfo) {
  const amount = transInfo.value_int
  const hash = transInfo.txid
  const index = transInfo.n
  const script = Buffer.from(
    transInfo.script_pub_key, 'hex'
  )
  const witnessUtxo = {
    script: script,
    value: amount
  }
  const mixin = { witnessUtxo }
  const mixin2 = {}
  switch (redeemType) {
    case 'p2wsh':
      mixin2.witnessScript = payment.redeem.output
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
