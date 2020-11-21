const fs = require('fs-extra')
function delAll () {
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
delAll()
