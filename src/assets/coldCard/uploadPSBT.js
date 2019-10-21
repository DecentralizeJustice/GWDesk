const fs = require('fs-extra')
const { dialog } = require('electron').remote

async function uploadPSBT () {
  // const options = {
  //   title: 'Save file - Electron example',
  //   defaultPath: app.getPath('desktop') + '/rerun.psbt',
  //   buttonLabel: 'Save PSBT'
  // }

  const fileName = await dialog.showOpenDialog(null)
  const path = fileName.filePaths[0]
  const buffer = await fs.readFile(path)
  const hex = buffer.toString('hex')
  return hex
}

export { uploadPSBT }
