import path from 'path'
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const spawn = require('child_process').spawn
const remote = require('electron').remote
const app = remote.app
const fs = require('fs-extra')
const os = require('os')
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function unpackBinary () {
  const platform = os.platform()
  let fileName
  let destination
  let executable
  let mode
  if (platform === 'darwin') {
    fileName = 'macHWI'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = path.join(destination, fileName)
    mode = 0o755
  } else if (platform === 'win32') {
    fileName = 'windowsHWI.exe'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = destination
    mode = 0o666
  } else {
    throw new Error('Your OS Is Unsupported')
  }
  // eslint-disable-next-line
  const source = path.join(__static, 'binaries', fileName)
  if (platform === 'darwin') {
    await fs.copySync(source, destination)
    await timeout(3000)
    await fs.chmod(executable, mode)
    await timeout(1000)
    console.log('copied')
  } else {
    await fs.copySync(source, destination)
    await timeout(1000)
    console.log('copied')
  }

  return true
}
function getBinary () {
  let fileName
  let destination
  let executable
  const platform = os.platform()
  if (platform === 'darwin') {
    fileName = 'macHWI'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = path.join(destination, fileName)
  } else {
    fileName = 'windowsHWI.exe'
    destination = path.join(app.getPath('userData'), 'binaries', fileName)
    executable = destination
  }
  return executable
}
export async function listDevices () {
  const binary = getBinary()
  const { stdout } = await exec(`"${binary}" enumerate`)
  const json = JSON.parse(stdout)
  return json
}

export async function promtpin (model, path) {
  const binary = getBinary()
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} promptpin`)
  const json = JSON.parse(stdout)
  return json
}

export async function enterpin (model, path, pin) {
  const binary = getBinary()
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} sendpin ${pin}`)
  const json = JSON.parse(stdout)
  return json
}
export async function signTrans (model, path, network, psbt) {
  const binary = getBinary()
  const extraFlag = getNetworkFlag(network)
  const { stdout } = await exec(`"${binary}" ${extraFlag} -t ${model} -d ${path} signtx ${psbt}`)
  const json = JSON.parse(stdout)
  return json
}
export async function getxpub (model, path, xpubpath) {
  const binary = getBinary()
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} getxpub ${xpubpath}`)
  const json = JSON.parse(stdout)
  return json
}

export async function wipe (model, path) {
  const binary = getBinary()
  const { stdout } = await exec(`"${binary}" -t ${model} -d ${path} wipe`)
  const json = JSON.parse(stdout)
  return json
}
export async function displayAddress (model, path, addressPath, network) {
  const binary = getBinary()
  const extraFlag = getNetworkFlag(network)
  const { stdout } = await exec(`"${binary}" ${extraFlag} -t ${model} -d ${path} displayaddress --wpkh --path ${addressPath} `)
  const json = JSON.parse(stdout)
  return json
}
function getBinarySpawn () {
  const platform = os.platform()
  if (platform === 'darwin') {
    return './macHWI'
  } else {
    return '.\\windowsHWI.exe'
  }
}
function getBinaryFolder () {
  const platform = os.platform()
  if (platform === 'darwin') {
    return path.join(app.getPath('userData'), 'binaries', 'macHWI')
  } else {
    return path.join(app.getPath('userData'), 'binaries')
  }
}
export function setup (model, path) {
  const spawnInfo = getBinarySpawn()
  const binaryFolder = getBinaryFolder()
  const commands = ['-t', `${model}`, '-d', `${path}`, '-i', 'setup']
  const command = spawn(spawnInfo, commands,
    { cwd: binaryFolder })
  return command
}
export function restore (model, path) {
  const spawnInfo = getBinarySpawn()
  const binaryFolder = getBinaryFolder()
  const commands = ['-t', `${model}`, '-d', `${path}`, '-i', 'restore']
  const command = spawn(spawnInfo, commands,
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
