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

export { uploadPSBT }
