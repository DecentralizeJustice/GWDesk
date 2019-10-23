
import { testnet } from '@/assets/constants/networkConstants.js'
import { getPubkeyArray } from '@/assets/util/keyUtil.js'
const bitcoin = require('bitcoinjs-lib')

async function genAddress (index, vpubArray, m) {
  const network = testnet
  const pubkeys = await getPubkeyArray(index, vpubArray)
  const info = bitcoin.payments.p2wsh({
    network: network,
    redeem: bitcoin.payments.p2ms({ m: m, pubkeys: pubkeys, network: network })
  })
  return info.address
}

export { genAddress }
