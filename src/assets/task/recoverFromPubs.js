import { importAddress, resetChainTo,
  getNodeInfo, getWalletTransactions
} from '@/assets/util/nodeUtils/nodeUtil.js'
import { walletName, oldestBlock, account, m } from '@/assets/constants/genConstants.js'
import { genAddress } from '@/assets/util/addressUtil.js'
async function recoverFromPubs (vpubArray) {
  // await resetChainTo(oldestBlock)
  const getTrans = await getWalletTransactions(account, walletName)
  // const getStatus = await getNodeInfo()
  // const address = await genAddress(0, vpubArray, m)
  console.log(getTrans)
  // const Address = await importAddress(account, address, walletName)
  // const addressAdd = await addAddresses(vpubArray)

  // return Address
}
async function addAddresses (vpubArray) {
  const address = genAddress(2, vpubArray, 2)
  return address
}
export {
  recoverFromPubs
}
