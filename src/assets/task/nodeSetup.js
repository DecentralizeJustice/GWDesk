import { startNode, createWallet } from '@/assets/util/nodeUtils/nodeUtil.js'
import { genAddress } from '@/assets/util/addressUtil.js'
async function nodeStartup (vpubArray) {
  const results = await startNode()
  const wallet = await createWallet('musig1')
  // const addressAdd = await addAddresses(vpubArray)
  console.log(wallet)
  return results
}
async function addAddresses (vpubArray) {
  const address = genAddress(2, vpubArray, 2)
  return address
}
export {
  nodeStartup
}
