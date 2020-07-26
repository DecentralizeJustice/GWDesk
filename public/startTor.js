'use strict'

const granax = require('@deadcanaries/granax')
const tor = granax()

tor.on('ready', function () {
  // eslint-disable-next-line
  tor.getInfo('net/listeners/socks', (err, result) => {
    const port = parseInt(result.split('"').join('').split(':')[1])
    console.log(`TorSocks listening on ${port}!`)
    if (process.send) {
      process.send('Hello')
    }
  })
})

tor.on('error', function (err) {
  console.error(err)
})
