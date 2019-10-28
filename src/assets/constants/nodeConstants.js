import { apiKey, token } from '@/assets/constants/userConstantFilesConstants.js'

const { NodeClient } = require('bclient')
const { WalletClient } = require('bcoin')

const network = {
  name: 'testnet',
  port: 18332
}
const clientOptions = {
  network: network.name,
  port: network.port,
  apiKey: apiKey
}
const walletOptions = {
  network: network.name,
  port: 18334,
  apiKey: apiKey
}

const client = new NodeClient(clientOptions)
const walletClient = new WalletClient(walletOptions)
export { client, walletClient, token }
