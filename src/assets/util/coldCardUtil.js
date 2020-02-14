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

export {
  test
}
