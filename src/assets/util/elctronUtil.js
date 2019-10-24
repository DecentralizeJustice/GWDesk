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
const fs = require('fs-extra')
const { dialog } = require('electron').remote
const remote = require('electron').remote
const app = remote.app

async function downloadPSBT (psbtHex) {
  const psbtBuffer = Buffer.from(psbtHex, 'hex')

  const options = {
    title: 'Save file - Electron example',
    defaultPath: app.getPath('desktop') + '/rerun.psbt',
    buttonLabel: 'Save PSBT'
  }

  const fileName = await dialog.showSaveDialog(null, options)
  const path = fileName.filePath
  await fs.writeFile(path, psbtBuffer)
  return true
}

export { downloadPSBT }

export { uploadPSBT }
