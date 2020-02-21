import {
  createWallet, createAccount
} from '@/assets/util/nodeUtil.js'
import {
  walletName, changeAccount, receiveAccount
} from '@/assets/constants/genConstants.js'

async function initWallet () {
  await createWalletFunc()
  await createAccountFunc(changeAccount)
  await createAccountFunc(receiveAccount)
  // const accounts = await getAccounts(walletName)
  // const createRecieve = await createAccount(walletName, receiveAccount)

  // console.log(createRecieve)
}
async function createWalletFunc () {
  try {
    const results = await createWallet(walletName)
    await this.updateWalletToken(results.token)
  } catch (error) {
    if (error.message !== 'WDB: Wallet already exists.') {
      throw (error)
    }
  }
}
async function createAccountFunc (accountName) {
  try {
    await createAccount(walletName, accountName)
  } catch (error) {
    console.log(error)
  }
}
export {
  initWallet
}
