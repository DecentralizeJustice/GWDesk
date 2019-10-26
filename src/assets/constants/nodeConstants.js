const { NodeClient } = require('bclient')
const { WalletClient } = require('bcoin')

const network = {
  name: 'testnet',
  port: 18332
}
const clientOptions = {
  network: network.name,
  port: network.port,
  apiKey: 'hunter2'
}
const walletOptions = {
  network: network.name,
  port: 18334,
  apiKey: 'hunter2'
}

const token = '20e90e17e941de2571f58b77107e0c752dfd99c64d2f1dcd8ef7af994902c6dd'

const client = new NodeClient(clientOptions)
const walletClient = new WalletClient(walletOptions)
export { client, walletClient, token }
