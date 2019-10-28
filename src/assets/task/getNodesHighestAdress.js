import { genAddress } from '@/assets/util/addressUtil.js'
import { m } from '@/assets/constants/userConstantFiles.js'
async function getHighestAddress (vpubArray) {
  const addressAdd = await addAddresses(vpubArray)
  console.log(addressAdd)
  // return results
}
async function addAddresses (vpubArray) {
  const address = genAddress(2, vpubArray, m)
  return address
}
export {
  getHighestAddress
}
