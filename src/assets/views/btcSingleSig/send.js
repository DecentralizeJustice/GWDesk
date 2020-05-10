import { getFeeRate } from '@/assets/util/btc/electrum/general.js'
export async function getAllFeeRates (rpcport, rpcuser, rpcpassword) {
  const feeObject = {}
  const feeOptions = [1, 2, 5, 10, 20]
  for (var i = 0; i < feeOptions.length; i++) {
    const fee = await getFeeRate(feeOptions[i], rpcport, rpcuser, rpcpassword)
    const feeOption = feeOptions[i]
    feeObject[feeOption] = fee.data.result
  }

  return feeObject
}
