import path from 'path'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const spawn = require('child_process').spawn
const remote = require('electron').remote
const app = remote.app
const fs = require('fs-extra')
const os = require('os')

const binaryFolder = '/binaries/'

const binFolder = app.getPath('userData') + '/binaries/macHWI'
// const macName = 'macHWI'

export async function unpackBinary () {
  const destination = app.getPath('userData') + '/binaries/'
  // let fileName
  const platform = os.platform()

  if (platform === 'darwin') {
    // fileName = 'macHWI'
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  // eslint-disable-next-line
  const source = path.join(__static, binaryFolder)
  await fs.copy(source, destination)
  await fs.chmod(destination + 'macHWI/macHWI', 0o755)
  return true
}

export async function listDevices () {
  const binary = binFolder + '/macHWI'
  const { stdout } = await exec(`"${binary}" enumerate`)
  const json = JSON.parse(stdout)
  return json
}

export async function promtpin (model, path) {
  const binary = binFolder + '/macHWI'
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} promptpin`)
  const json = JSON.parse(stdout)
  return json
}

export async function enterpin (model, path, pin) {
  const binary = binFolder + '/macHWI'
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} sendpin ${pin}`)
  const json = JSON.parse(stdout)
  return json
}
export async function signTrans (model, path, network, psbt) {
  const binary = binFolder + '/macHWI'
  const extraFlag = getNetworkFlag(network)
  const { stdout } = await exec(`"${binary}" ${extraFlag} -t ${model} -d ${path} signtx ${psbt}`)
  const json = JSON.parse(stdout)
  return json
}
export async function getxpub (model, path, xpubpath) {
  const binary = binFolder + '/macHWI'
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} getxpub ${xpubpath}`)
  const json = JSON.parse(stdout)
  return json
}

export async function wipe (model, path) {
  const binary = binFolder + '/macHWI'
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} wipe`)
  const json = JSON.parse(stdout)
  return json
}
export async function displayAddress (model, path, addressPath, network) {
  const binary = binFolder + '/macHWI'
  const extraFlag = getNetworkFlag(network)
  const { stdout } = await exec(`"${binary}" ${extraFlag} -t ${model} -d ${path} displayaddress --wpkh --path ${addressPath} `)
  const json = JSON.parse(stdout)
  return json
}
export function setup (model, path) {
  const binaryFolder = app.getPath('userData') + '/binaries/macHWI'
  const commands = ['-t', `${model}`, '-d', `${path}`, '-i', 'setup']
  const command = spawn('./macHWI', commands,
    { cwd: binaryFolder })
  return command
}
export function restore (model, path) {
  const binaryFolder = app.getPath('userData') + '/binaries/macHWI'
  const commands = ['-t', `${model}`, '-d', `${path}`, '-i', 'restore']
  const command = spawn('./macHWI', commands,
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
