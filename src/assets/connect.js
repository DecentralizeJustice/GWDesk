const { NodeClient } = require('bclient')
const network = {
  name: 'testnet',
  port: 18332
}
const clientOptions = {
  network: network.name,
  port: network.port,
  apiKey: 'hunter2'
}

const client = new NodeClient(clientOptions)
async function asyncCall () {
  {
    const clientinfo = await client.getInfo()
    return clientinfo
  }
}
export default asyncCall
