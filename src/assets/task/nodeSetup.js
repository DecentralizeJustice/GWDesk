import { startNode, createWallet } from '@/assets/util/nodeUtils/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
import { genAddress } from '@/assets/util/addressUtil.js'
async function nodeStartup (vpubArray) {
  const results = await startNode()
  const wallet = await createWallet(walletName)
  console.log(wallet)
  // const addressAdd = await addAddresses(vpubArray)
  return results
}
async function addAddresses (vpubArray) {
  const address = genAddress(2, vpubArray, 2)
  return address
}
export {
  nodeStartup
}
