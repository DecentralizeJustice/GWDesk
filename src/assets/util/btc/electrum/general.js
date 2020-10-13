import path from 'path'
const remote = require('electron').remote
const spawn = require('child_process').spawn
const os = require('os')
const crypto = require('crypto')
const axios = require('axios')
const fs = require('fs-extra')
const app = remote.app
const copyFile = fs.promises.copyFile
const unlink = fs.promises.unlink
const readdir = fs.promises.readdir
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function unpackElectrum () {
  const platform = os.platform()
  let fileName
  if (platform === 'darwin') {
    fileName = 'macElectrum'
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  const destination = app.getPath('userData') + '/binaries/' + fileName
  // eslint-disable-next-line
  const source = path.join(__static, '/binaries/' + fileName)
  await copyFile(source, destination)
  return true
}

export async function deleteWallet (walletName, network) {
  const pathAddition = getPathNetwork(network)
  const destination =
  app.getPath('userData') + `/binaries/electrumFolder/${pathAddition}wallets/`
  await unlink(destination + walletName)
  return true
}

export async function listWalletsThatExist (network) {
  const pathAddition = getPathNetwork(network)
  const destination =
  app.getPath('userData') + `/binaries/electrumFolder/${pathAddition}wallets/`
  const files = await readdir(destination)
  return files
}

export async function startDeamon (network) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const baseCommands = ['-D', 'electrumFolder', 'daemon']
  const commands = addCommandNetwork(baseCommands, network)
  const process = await spawn('./macElectrum', commands,
    { cwd: binaryFolder })
  process.stdout.on('data', function (data) {
    console.log(data.toString())
  })
  await timeout(10000)
  return true
}

export async function getinfo (rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('getinfo', {}, rpcport, rpcuser,
    rpcpassword)
  return request
}

export async function getTransaction (txid, rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('gettransaction', { txid }, rpcport, rpcuser,
    rpcpassword)
  return request
}
export async function getunusedaddress (walletName, network, rpcport, rpcuser, rpcpassword) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('getunusedaddress',
    { wallet: `electrumFolder/${pathAddition}wallets/${walletName}` },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function getFeeRate (withinBlock, rpcport, rpcuser, rpcpassword) {
  const blockoptions = {
    25: 0,
    10: 0.28,
    5: 0.58,
    2: 0.88,
    1: 1
  }
  const request = await makeRpcRequest('getfeerate',
    {
      fee_method: 'eta',
      fee_level: blockoptions[withinBlock]
    },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function makeRpcRequest (method, params, rpcport, rpcuser,
  rpcpassword) {
  const data = {
    method: method,
    params: params,
    jsonrpc: '2.0'
  }
  data.id = crypto.createHash('sha256')
    .update(JSON.stringify(data) + Date.now(), 'utf8')
    .digest('hex')
  const request = await axios.post('http://127.0.0.1' + `:${rpcport}`, data, {
    auth: {
      username: rpcuser,
      password: rpcpassword
    }
  }
  )
  return request
}

export async function hardStopDeamon (network) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const baseCommands = ['-D', 'electrumFolder', 'stop']
  const commands = addCommandNetwork(baseCommands, network)
  await spawn('./macElectrum', commands,
    { cwd: binaryFolder })
  await timeout(10000)
  return true
}

export async function requestStopDeamon (rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('stop', {}, rpcport, rpcuser,
    rpcpassword)
  return request
}

export async function restoreWallet (walletName, recoveryInfo, rpcport, rpcuser,
  rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('restore',
    {
      text: recoveryInfo,
      wallet_path: `electrumFolder/${pathAddition}wallets/${walletName}`
    },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function sendAll (destination, walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('payto',
    {
      wallet: `electrumFolder/${pathAddition}wallets/${walletName}`,
      destination: destination,
      unsigned: true,
      rbf: true,
      amount: '!'
    },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function send (satPerByte, amountArray, destinationArray, walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  if (amountArray.length === 1 && destinationArray.length === 1) {
    const request = await makeRpcRequest('payto',
      {
        wallet: `electrumFolder/${pathAddition}wallets/${walletName}`,
        destination: destinationArray[0],
        unsigned: true,
        rbf: true,
        amount: amountArray[0],
        feerate: satPerByte
      },
      rpcport, rpcuser, rpcpassword)
    return request
  }
  if (amountArray.length > 1 && destinationArray.length > 1 &&
      amountArray.length === destinationArray.length) {
    const outputArray = []
    for (var i = 0; i < amountArray.length; i++) {
      outputArray.push([destinationArray[i], amountArray[i]])
    }
    const request = await makeRpcRequest('paytomany',
      {
        wallet: `electrumFolder/${pathAddition}wallets/${walletName}`,
        outputs: outputArray,
        unsigned: true,
        rbf: true,
        feerate: satPerByte
      },
      rpcport, rpcuser, rpcpassword)
    return request
  }
  throw new Error('Wrong Inputs')
}

export async function listAddresses (walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('listaddresses',
    { wallet: `electrumFolder/${pathAddition}wallets/${walletName}` },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function getWalletHistory (walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('onchain_history',
    { wallet: `electrumFolder/${pathAddition}wallets/${walletName}`, show_addresses: true },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function walletReady (walletName, network, rpcport, rpcuser, rpcpassword) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('is_synchronized',
    { wallet: `electrumFolder/${pathAddition}wallets/${walletName}` },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function broadcastTransaction (hex, rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('broadcast',
    { tx: hex },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function getBalance (walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('getbalance',
    { wallet: `electrumFolder/${pathAddition}wallets/${walletName}` },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function listLoadedWallets (rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('list_wallets', {},
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function loadWallet (walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const request = await makeRpcRequest('load_wallet',
    { wallet_path: `electrumFolder/${pathAddition}wallets/${walletName}` },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function configDaemon (port, user, password, network) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const commands0 =
  addCommandNetwork(['-D', 'electrumFolder', '-o', 'setconfig', 'rpcport', port], network)
  await spawn('./macElectrum',
    commands0,
    { cwd: binaryFolder })
  await timeout(1000)
  const commands1 =
  addCommandNetwork(['-D', 'electrumFolder', '-o', 'setconfig', 'rpcuser', user], network)
  await spawn('./macElectrum',
    commands1,
    { cwd: binaryFolder })
  await timeout(1000)
  const commands2 =
  addCommandNetwork(['-D', 'electrumFolder', '-o', 'setconfig', 'rpcpassword', password], network)
  await spawn('./macElectrum',
    commands2,
    { cwd: binaryFolder })
  await timeout(5000)
  return true
}

function getPathNetwork (network) {
  if (network === 'testnet') {
    return 'testnet/'
  } else if (network === 'mainnet') {
    return ''
  } else {
    throw new Error('No recognized network')
  }
}

function addCommandNetwork (commands, network) {
  if (network === 'testnet') {
    commands.unshift('--testnet')
    return commands
  } else if (network === 'mainnet') {
    return commands
  } else {
    throw new Error('No recognized network')
  }
}
