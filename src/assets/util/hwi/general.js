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

export async function unpackBinary () {
  const destination = app.getPath('userData') + '/binaries'
  let tarName
  const platform = os.platform()

  if (platform === 'darwin') {
    tarName = 'hwi--mac-amd64.tar.gz'
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

export async function listDevices () {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const { stdout } = await exec(`"${binary}" enumerate`)
  const json = JSON.parse(stdout)
  return json
}

export async function promtpin (brand, path) {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const { stdout } = await exec(`"${binary}" -t ${brand} -d ${path} promptpin`)
  const json = JSON.parse(stdout)
  return json
}

export async function enterpin (brand, path, pin) {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const { stdout } = await exec(`"${binary}" -t ${brand} -d ${path} sendpin ${pin}`)
  const json = JSON.parse(stdout)
  return json
}

export async function getxpub (brand, path, xpubpath) {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const { stdout } = await exec(`"${binary}" -t ${brand} -d ${path} getxpub ${xpubpath}`)
  const json = JSON.parse(stdout)
  return json
}

export async function wipe (brand, path) {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const { stdout } = await exec(`"${binary}" -t ${brand} -d ${path} wipe`)
  const json = JSON.parse(stdout)
  return json
}
export async function displayAddress (brand, path, addressPath, network) {
  const binary = app.getPath('userData') + '/binaries/hwi'
  const extraFlag = getNetworkFlag(network)
  const { stdout } = await exec(`"${binary}" ${extraFlag} -t ${brand} -d ${path} displayaddress --wpkh --path ${addressPath} `)
  const json = JSON.parse(stdout)
  return json
}
export function setup (brand, path) {
  const binaryFolder = app.getPath('userData') + '/binaries'
  const commands = ['-t', `${brand}`, '-d', `${path}`, '-i', 'setup']
  const command = spawn('hwi', commands,
    { cwd: binaryFolder })
  return command
}
export function restore (brand, path) {
  const binaryFolder = app.getPath('userData') + '/binaries'
  const commands = ['-t', `${brand}`, '-d', `${path}`, '-i', 'restore']
  const command = spawn('hwi', commands,
    { cwd: binaryFolder })
  return command
}
function getNetworkFlag (network) {
  if (network === 'testnet') {
    return '--testnet'
  } else if (network === 'mainnet') {
    return ''
  } else {
    throw new Error('No recognized network')
  }
}
