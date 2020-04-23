import path from 'path'
const remote = require('electron').remote
const app = remote.app
const fs = require('fs-extra')
const copyFile = fs.promises.copyFile
const unlink = fs.promises.unlink
const binaryFolder = '/binaries/'
const os = require('os')
const spawn = require('child_process').spawn
// eslint-disable-next-line
const timeout = ms => new Promise(res => setTimeout(res, ms))
const crypto = require('crypto')
const axios = require('axios')

export async function unpackElectrum () {
  const destination = app.getPath('userData') + '/binaries/macElectrum'
  const platform = os.platform()
  let fileName
  if (platform === 'darwin') {
    fileName = 'macElectrum'
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  // eslint-disable-next-line
  const source = path.join(__static, binaryFolder + fileName)
  await copyFile(source, destination)
  return true
}

export async function deleteWallet (walletName) {
  const destination = app.getPath('userData') + '/binaries/electrum_data/wallets/'
  await unlink(destination + walletName)
  return true
}

export async function startDeamon () {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const commands = ['-D', 'electrumFolder', 'daemon', '-d']
  await spawn('./macElectrum', commands,
    { cwd: binaryFolder })
  await timeout(3000)
  return true
}
export async function makeRpcRequest (method, params, rpcport, rpcuser,
  rpcpassword) {
  try {
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
  } catch (error) {
    return error
  }
}
export async function hardStopDeamon () {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const commands = ['-D', 'electrumFolder', 'stop']
  await spawn('./macElectrum', commands,
    { cwd: binaryFolder })
  await timeout(3000)
  return true
}
export async function restoreWallet (walletName, recoveryInfo) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const commands = ['-P', '-w', `electrum_data/wallets/${walletName}`, 'restore',
    recoveryInfo]
  await spawn('./macElectrum', commands,
    { cwd: binaryFolder })
  await timeout(10000)
  return true
}
export async function loadWallet (walletName) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const commands = ['-P', '-w', `electrum_data/wallets/${walletName}`, 'daemon',
    'load_wallet']
  await spawn('./macElectrum', commands,
    { cwd: binaryFolder })
  await timeout(5000)
  return true
}
export async function configDaemon (port, user, password) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  await spawn('./macElectrum',
    ['-D', 'electrumFolder', '-o', 'setconfig', 'rpcport', port],
    { cwd: binaryFolder })
  await timeout(1000)
  await spawn('./macElectrum',
    ['-D', 'electrumFolder', '-o', 'setconfig', 'rpcuser', user],
    { cwd: binaryFolder })
  await timeout(1000)
  await spawn('./macElectrum',
    ['-D', 'electrumFolder', '-o', 'setconfig', 'rpcpassword', password],
    { cwd: binaryFolder })
  await timeout(5000)
  return true
}
