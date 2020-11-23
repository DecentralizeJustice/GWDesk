const fs = require('fs-extra')
const os = require('os')
const platform = os.platform()
function delAll () {
  if (platform === 'darwin') {
    fs.remove('public/binaries/windowsTrezorTool', err => {
      if (err) return console.error(err)
      console.log('success!')
    })
    fs.remove('public/binaries/windowsElectrum.exe', err => {
      if (err) return console.error(err)
      console.log('success!')
    })
    fs.remove('public/binaries/windowsHWI.exe', err => {
      if (err) return console.error(err)
      console.log('success!')
    })
  } else {
    fs.remove('public\\binaries\\macElectrumGW', err => {
      if (err) return console.error(err)
      console.log('success!')
    })
    fs.remove('public\\binaries\\macTrezorTool', err => {
      if (err) return console.error(err)
      console.log('success!')
    })
    fs.remove('public\\binaries\\macHWI', err => {
      if (err) return console.error(err)
      console.log('success!')
    })
  }
}
delAll()
