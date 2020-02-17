import path from 'path'
const util = require('util')
const remote = require('electron').remote
const app = remote.app

const execFile = util.promisify(require('child_process').execFile)

const file = path.join(app.getPath('desktop'), 'coldCardExe')

async function test () {
  console.log(file)
  const stdout = await execFile(file)
  // const parsed = JSON.parse('{' + stdout + '}')
  return stdout.stdout
}
async function recoverColdCardsInfo (infoString) {
  const walletObjects = []
  const regEx = /([0-9]|[A-Z]){8}:\s?\w*\b/g
  const xpubsAndXFP = infoString.match(regEx)
  // eslint-disable-next-line
  const p2wsh_deriv = "m/48'/1'/0'/2'"
  for (const pubInfo of xpubsAndXFP) {
    const xfpRegEx = /([0-9]|[A-Z]){8}/g
    const p2wshRegEx = /(?<=:\s?)([0-9]|[A-Z]|[a-z])*\b/g
    const xfp = pubInfo.match(xfpRegEx)[0]
    let p2wsh = pubInfo.match(p2wshRegEx)[0]
    p2wsh = p2wsh.match(/([0-9]|[A-Z]|[a-z])*\b/g)[0]
    const walletObject = {
      xfp: xfp, p2wsh: p2wsh, p2wsh_deriv: p2wsh_deriv
    }
    walletObjects.push(walletObject)
  }
  return walletObjects
}

export {
  test, recoverColdCardsInfo
}
