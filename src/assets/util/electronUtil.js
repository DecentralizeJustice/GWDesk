const fs = require('fs-extra')
const remote = require('electron').remote
const app = remote.app
const { dialog } = require('electron').remote

async function uploadPSBT () {
  const options = {
    defaultPath: app.getPath('desktop'),
    buttonLabel: 'Upload PSBT'
  }

  const fileName = await dialog.showOpenDialog(null, options)
  const path = fileName.filePaths[0]
  const buffer = await fs.readFile(path)
  const hex = buffer.toString('hex')
  return hex
}
async function uploadJSON () {
  const options = {
    defaultPath: app.getPath('desktop'),
    buttonLabel: 'Upload JSON'
  }
  const fileName = await dialog.showOpenDialog(null, options)
  const path = fileName.filePaths[0]
  const rawFile = await fs.readFile(path)
  const object = JSON.parse(rawFile)
  return object
}
async function downloadPSBT (psbtHex) {
  const psbtBuffer = Buffer.from(psbtHex, 'hex')

  const options = {
    title: 'Save PSBT',
    defaultPath: app.getPath('desktop') + '/rerun.psbt',
    buttonLabel: 'Save PSBT'
  }

  const fileName = await dialog.showSaveDialog(null, options)
  const path = fileName.filePath
  await fs.writeFile(path, psbtBuffer)
  return true
}
async function downloadTXT (txt) {
  const options = {
    title: 'Save Multisig File',
    defaultPath: app.getPath('desktop') + '/multisig.txt',
    buttonLabel: 'Save File'
  }

  const fileName = await dialog.showSaveDialog(null, options)
  const path = fileName.filePath
  await fs.writeFile(path, txt)
  return true
}

export { downloadPSBT, uploadPSBT, uploadJSON, downloadTXT }
