import path from 'path'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const spawn = require('child_process').spawn
const remote = require('electron').remote
const app = remote.app
const fs = require('fs-extra')
const zlib = require('zlib')
const tar = require('tar-fs')
const binaryFolder = '/binaries/'
const os = require('os')
export async function unpackMainBinary () {
  const destination = app.getPath('userData') + '/binaries'
  let tarName
  const platform = os.platform()

  if (platform === 'darwin') {
    tarName = 'macTrezorCliTool.tar.gz'
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  // eslint-disable-next-line
  const source = path.join(__static, binaryFolder + tarName)
  await new Promise((resolve, reject) => {
    fs.createReadStream(source)
      .on('error', err => reject(err))
      .pipe(zlib.Unzip())
      .pipe(tar.extract(destination))
      .on('finish', resolve)
  })
  return true
}
export async function unpackPhotos () {
  const destination = app.getPath('userData') + '/binaries'
  const tarName = 'roboPhotos.tar.gz'

  // eslint-disable-next-line
  const source = path.join(__static, binaryFolder + tarName)
  await new Promise((resolve, reject) => {
    fs.createReadStream(source)
      .on('error', err => reject(err))
      .pipe(zlib.Unzip())
      .pipe(tar.extract(destination))
      .on('finish', resolve)
  })
  return true
}

export function changeName (name) {
  const binaryFolder = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const commands = ['set-label', '-l', name]
  const command = spawn('./macTrezorCliTool', commands,
    { cwd: binaryFolder })
  return command
}
export async function getInfo () {
  const binary = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const { stdout } = await exec(`"${binary}"/macTrezorCliTool get-features`)
  return stdout
}
export async function wipe () {
  const binary = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const { stdout } = await exec(`"${binary}"/macTrezorCliTool wipe-device -b`)
  return stdout
}
export function getNode (node) {
  const binaryFolder = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const commands = ['get-public-node', '-n', node]
  const command = spawn('./macTrezorCliTool', commands,
    { cwd: binaryFolder })
  return command
}
export function changePhoto (photo) {
  const binaryFolder = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const commands = ['set-homescreen', '-f', `../roboPhotos/${photo}.toif`]
  const command = spawn('./macTrezorCliTool', commands,
    { cwd: binaryFolder })
  return command
}
export function updateFirmware (version) {
  const binaryFolder = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const commands = ['firmware-update', '-v', `${version}`]
  const command = spawn('./macTrezorCliTool', commands,
    { cwd: binaryFolder })
  return command
}
export async function listDevices () {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const { stdout } = await exec(`"${binary}" enumerate`)
  const json = JSON.parse(stdout)
  return json
}

export async function getVersionNumber () {
  const stdout = await getInfo()
  const majorPatt = /major_version: [0-9]/i
  const majorVersion = stdout.match(majorPatt)[0].substr(-1)
  const minorPatt = /minor_version: [0-9]/i
  const minorVersion = stdout.match(minorPatt)[0].substr(-1)
  const patchPatt = /patch_version: [0-9]/i
  const patchVersion = stdout.match(patchPatt)[0].substr(-1)
  return majorVersion + '.' + minorVersion + '.' + patchVersion
}

export async function getStatus () {
  let status = ''
  const stdout = await getInfo()
  const firmwarePatt = /firmware_present: False/i
  const isNull = stdout.match(firmwarePatt) === null
  if (!isNull) {
    const firmwarePresent = !(stdout.match(firmwarePatt)[0] === 'firmware_present: False')
    if (!firmwarePresent) {
      status = [0, 'noFirmware']
      return status
    } else {
      throw Error('Not possible wallet state')
    }
  }
  const initializePatt = /initialized: True|initialized: False/i
  const initialized = !(stdout.match(initializePatt)[0].length === 18)
  if (!initialized) {
    status = [1, 'notInitialized']
    return status
  }
  const backupPatt = /needs_backup: True|needs_backup: False/i
  const backuped = !(stdout.match(backupPatt)[0].length === 18)
  if (initialized && !backuped) {
    status = [2, 'initializedAndNotBackuped']
    return status
  }
  if (initialized && backuped) {
    status = [3, 'initializedAndBackuped']
    return status
  }
  throw Error('Unknown Wallet Status')
}
// function getNetworkFlag (network) {
//   if (network === 'testnet') {
//     return '--testnet'
//   } else if (network === 'mainnet') {
//     return ''
//   } else {
//     throw new Error('No recognized network')
//   }
// }
