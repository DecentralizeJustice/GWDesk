import path from 'path'
// const exec = util.promisify(require('child_process').exec)
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

export async function daemonControl (command) {
  const binaryFolder = app.getPath('userData') + '/binaries/'
  const commands = ['-P', 'daemon', command]
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
    ['-P', 'setconfig', 'rpcport', port],
    { cwd: binaryFolder })
  await spawn('./macElectrum',
    ['-P', 'setconfig', 'rpcuser', user],
    { cwd: binaryFolder })
  await spawn('./macElectrum',
    ['-P', 'setconfig', 'rpcpassword', password],
    { cwd: binaryFolder })
  await timeout(5000)
  return true
}
