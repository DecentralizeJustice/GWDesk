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
