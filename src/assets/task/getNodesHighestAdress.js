import { startNode } from '@/assets/util/nodeUtils/nodeUtil.js'
import { genAddress } from '@/assets/util/addressUtil.js'
async function getHighestAddress (vpubArray) {
  const results = await startNode()
  const addressAdd = await addAddresses(vpubArray)
  console.log(addressAdd)
  return results
}
async function addAddresses (vpubArray) {
  const address = genAddress(2, vpubArray, 2)
  return address
}
export {
  getHighestAddress
}
