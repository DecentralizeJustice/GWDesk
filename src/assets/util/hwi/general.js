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
  return new Promise((resolve, reject) => {
    fs.createReadStream(source)
      .on('error', err => reject(err))
      .pipe(zlib.Unzip())
      .pipe(tar.extract(destination))
      .on('finish', resolve)
  })
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

export function setup (brand, path) {
  const binaryFolder = app.getPath('userData') + '/binaries'
  const commands = ['-t', `${brand}`, '-d', `${path}`, '-i', 'setup']
  // console.log(commands)
  const ls = spawn('hwi', commands,
    { cwd: binaryFolder })
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stdin.on('data', (data) => {
    console.log('frfrfr')
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })

  return ls
}
