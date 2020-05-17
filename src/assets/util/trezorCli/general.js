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
export function changePhoto (photo) {
  const binaryFolder = app.getPath('userData') + '/binaries/macTrezorCliTool'
  const commands = ['set-homescreen', '-f', `../roboPhotos/${photo}.toif`]
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

// function getNetworkFlag (network) {
//   if (network === 'testnet') {
//     return '--testnet'
//   } else if (network === 'mainnet') {
//     return ''
//   } else {
//     throw new Error('No recognized network')
//   }
// }
