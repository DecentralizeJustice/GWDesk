import path from 'path'
const kill = require('tree-kill')
const find = require('find-process')
const remote = require('electron').remote
const spawn = require('child_process').spawn
const os = require('os')
const crypto = require('crypto')
const axios = require('axios')
const fs = require('fs-extra')
const fsPlain = require('fs')
const app = remote.app
const readdir = fs.promises.readdir
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function unpackElectrum () {
  const platform = os.platform()
  let fileName
  let source
  let destination
  let executable
  if (platform === 'darwin') {
    fileName = 'macElectrumGW'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = path.join(destination, fileName)
  } else if (platform === 'win32') {
    fileName = 'windowsElectrum.exe'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = destination
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  // eslint-disable-next-line
  source = path.join(__static, 'binaries', fileName)
  await fs.copy(source, destination)
  await timeout(1000)
  fsPlain.chmod(executable, 0o775, (err) => {
    if (err) throw err
  })
  await timeout(1000)
  return true
}
export async function permissionElectrum () {
  const platform = os.platform()
  let executable
  if (platform === 'darwin') {
    const fileName = 'macElectrumGW'
    const destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = path.join(destination, fileName)
  } else if (platform === 'win32') {
    const fileName = 'windowsElectrum.exe'
    const destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = destination
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  fsPlain.chmod(executable, 0o775, (err) => {
    if (err) throw err
  })
  await timeout(2000)
  return true
}
export async function configDaemon (port, user, password, network) {
  const platform = os.platform()
  let destination
  let fileName
  let electrumFolder
  if (platform === 'darwin') {
    fileName = './macElectrumGW'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    electrumFolder = '../electrumFolder'
  } else {
    fileName = '.\\windowsElectrum.exe'
    destination = path.join(app.getPath('userData'), 'binaries')
    electrumFolder = 'electrum_data'
  }
  const binaryFolder = destination
  const commands0 =
  addCommandNetwork(['-D', electrumFolder, '-o', 'setconfig', 'rpcport', port], network)
  const commands1 =
  addCommandNetwork(['-D', electrumFolder, '-o', 'setconfig', 'rpcuser', user], network)
  const commands2 =
  addCommandNetwork(['-D', electrumFolder, '-o', 'setconfig', 'rpcpassword', password], network)
  const ls = spawn(fileName,
    commands0,
    { cwd: binaryFolder })
  ls.on('close', (code) => {
    console.log(`1 done ${code}`)
  })
  await timeout(20000)
  console.log('moving to 2')
  const lsh = spawn(fileName,
    commands1,
    { cwd: binaryFolder })
  lsh.on('close', (code) => {
    console.log(`2 done ${code}`)
  })
  await timeout(20000)
  console.log('moving to 3')
  const lsu = spawn(fileName,
    commands2,
    { cwd: binaryFolder })
  lsu.on('close', (code) => {
    console.log(`3 done ${code}`)
  })
  await timeout(20000)
  console.log('config done')
  return true
}

export async function startDeamon (network) {
  console.log('starting Daemon')
  const platform = os.platform()
  if (platform === 'darwin') {
    const binaryFolder = app.getPath('userData') + '/binaries/macElectrumGW'
    const baseCommands = ['-D', '../electrumFolder', 'daemon']
    const commands = addCommandNetwork(baseCommands, network)
    console.log(commands)
    const process = await spawn('./macElectrumGW', commands,
      { cwd: binaryFolder })
    process.stdout.on('data', function (data) {
      console.log(data.toString())
    })
    await timeout(10000)
    return true
  } else if (platform === 'win32') {
    const binaryFolder = path.join(app.getPath('userData'), 'binaries')
    const baseCommands = ['-D', 'electrum_data', 'daemon']
    const commands = addCommandNetwork(baseCommands, network)
    console.log(commands)
    const process = await spawn('.\\windowsElectrum.exe', commands,
      { cwd: binaryFolder })
    process.stdout.on('data', function (data) {
      console.log(data.toString())
    })
    await timeout(10000)
    return true
  } else {
    throw new Error('Your OS Is Unsupported')
  }
}
export async function hardStopDeamon () {
  console.log('stopping Daemon')
  let processName
  const platform = os.platform()
  if (platform === 'darwin') {
    processName = 'macElectrumGW'
  } else {
    processName = 'windowsElectrum'
  }
  const pidList = await find('name', processName, true)
  for (var i = 0; i < pidList.length; i++) {
    const pid = pidList[i].pid
    await kill(pid)
  }
  await timeout(5000)
  return true
}
export async function checkIfNodeProcessRunning () {
  let processName
  const platform = os.platform()
  if (platform === 'darwin') {
    processName = 'macElectrumGW'
  } else {
    processName = 'windowsElectrum'
  }
  const pidList = await find('name', processName, true)
  if (pidList.length > 0) {
    return true
  }
  return false
}
function getElectrumFolderLocation () {
  const platform = os.platform()
  if (platform === 'darwin') {
    return '../electrumFolder/'
  } else {
    return 'electrum_data\\'
  }
}
function getElectrumDataName () {
  const platform = os.platform()
  if (platform === 'darwin') {
    return 'electrumFolder'
  } else {
    return 'electrum_data'
  }
}

export async function deleteWallet (walletName, network) {
  try {
    const pathAddition = getPathNetwork(network)
    const electrumDataName = getElectrumDataName()
    const destination =
     path.join(app.getPath('userData'), 'binaries', electrumDataName, pathAddition, 'wallets', walletName)
    await fs.remove(destination)
    return true
  } catch (e) {
    if (e.toString().slice(0, 47) === 'Error: ENOENT: no such file or directory, unlin') {
      return true
    } else {
      throw Error(e)
    }
  }
}
export async function deleteElectrumFolder (network) {
  const pathAddition = getPathNetwork(network)
  const electrumDataName = getElectrumDataName()
  const destination = path.join(app.getPath('userData'), 'binaries', electrumDataName, pathAddition)
  await fs.remove(destination)
  return true
}
export async function listWalletsThatExist (network) {
  const electrumDataName = getElectrumDataName()
  try {
    const pathAddition = getPathNetwork(network)
    const destination =
     path.join(app.getPath('userData'), 'binaries', electrumDataName, pathAddition, 'wallets')
    const files = await readdir(destination)
    return files
  } catch (e) {
    if (e.toString().slice(0, 40) === 'Error: ENOENT: no such file or directory') {
      return []
    } else {
      throw e
    }
  }
}

export async function getinfo (rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('getinfo', {}, rpcport, rpcuser,
    rpcpassword)
  return request
}

export async function deserializeTrans (tx, rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('deserialize', { tx: tx }, rpcport, rpcuser,
    rpcpassword)
  return request
}

export async function listunspent (walletName, network, rpcport, rpcuser, rpcpassword) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('listunspent',
    { wallet: walletPath },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function getTransaction (txid, rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('gettransaction', { txid }, rpcport, rpcuser,
    rpcpassword)
  return request
}
export async function getunusedaddress (walletName, network, rpcport, rpcuser, rpcpassword) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('getunusedaddress',
    { wallet: walletPath },
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

export async function requestStopDeamon (rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('stop', {}, rpcport, rpcuser,
    rpcpassword)
  return request
}

export async function restoreWallet (walletName, recoveryInfo, rpcport, rpcuser,
  rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('restore',
    {
      text: recoveryInfo,
      wallet_path: walletPath
    },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function sendAll (satPerByte, destination, walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('payto',
    {
      wallet: walletPath,
      destination: destination,
      unsigned: true,
      rbf: true,
      amount: '!',
      feerate: satPerByte
    },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function send (satPerByte, amountArray, destinationArray, walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  if (amountArray.length === 1 && destinationArray.length === 1) {
    const request = await makeRpcRequest('payto',
      {
        wallet: walletPath,
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
        wallet: `../electrumFolder/${pathAddition}wallets/${walletName}`,
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
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('listaddresses',
    { wallet: walletPath },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function getWalletHistory (walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('onchain_history',
    { wallet: walletPath, show_addresses: true },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function walletReady (walletName, network, rpcport, rpcuser, rpcpassword) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('is_synchronized',
    { wallet: walletPath },
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
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('getbalance',
    { wallet: walletPath },
    rpcport, rpcuser, rpcpassword)
  return request
}

export async function listLoadedWallets (rpcport, rpcuser, rpcpassword) {
  const request = await makeRpcRequest('list_wallets', {},
    rpcport, rpcuser, rpcpassword)
  const info = {
    data: {}
  }
  const walletPaths = []
  const finalPathList = []
  if (request.data.result.length === 0) {
    return request
  }
  request.data.result.forEach((element) => {
    walletPaths.push(element.path)
  })
  walletPaths.forEach((item, i) => {
    let myRegexp
    const platform = os.platform()
    if (platform === 'darwin') {
      myRegexp = /wallets\/(.*)/
    } else {
      myRegexp = /\\wallets\\(.*)/
    }
    const match = myRegexp.exec(item)
    match.forEach(thing => {
      if (thing.length === 40) {
        finalPathList.push(thing)
      }
    })
  })
  info.data.result = finalPathList
  return info
}

export async function loadWallet (walletName, rpcport, rpcuser, rpcpassword, network) {
  const pathAddition = getPathNetwork(network)
  const electrumFolderLocation = getElectrumFolderLocation()
  const walletPath = electrumFolderLocation + path.join(pathAddition, 'wallets', walletName)
  const request = await makeRpcRequest('load_wallet',
    { wallet_path: walletPath },
    rpcport, rpcuser, rpcpassword)
  return request
}

function getPathNetwork (network) {
  if (network === 'testnet') {
    return 'testnet'
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
