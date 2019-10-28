import { importAddress, resetChainTo,
  getNodeInfo, getWalletTransactions, listWalletAddresses
} from '@/assets/util/nodeUtils/nodeUtil.js'
import { walletName, oldestBlock, account } from '@/assets/constants/genConstants.js'
import { m } from '@/assets/constants/userConstantFiles.js'
import { genAddress, checkArrayForAdress } from '@/assets/util/addressUtil.js'
async function recoverFromPubs (vpubArray) {
  // const getStatus = await getNodeInfo()
  // const results = await addAddress(vpubArray, 1)
  const address = await genAddress(1, vpubArray, m)
  const getTrans = await listWalletAddresses(account, walletName)
  const hi = await addAddresses(address, getTrans)
  // await pause(1)
  console.log(hi)
  return getTrans
}
async function addAddresses (address, addressArray) {
  const results = checkArrayForAdress(address, addressArray)
  return results
}
async function addAddress (vpubArray, index) {
  const address = await genAddress(index, vpubArray, m)
  console.log(address)
  const result = await importAddress(account, address, walletName)
  await resetChainTo(oldestBlock)
  return result
}
async function pause (seconds) {
  return new Promise(resolve =>
    setTimeout(() => resolve(true), seconds * 1000))
}
export {
  recoverFromPubs
}
