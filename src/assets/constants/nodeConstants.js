import { apiKey, token } from '@/assets/constants/userConstantFiles.js'

// const { } = require('bclient')
const { WalletClient, NodeClient } = require('bcoin')

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
