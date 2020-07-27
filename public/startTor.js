'use strict'

const granax = require('@deadcanaries/granax')
const tor = granax()

tor.on('ready', function () {
  // eslint-disable-next-line
  tor.getInfo('net/listeners/socks', (err, result) => {
    const port = parseInt(result.split('"').join('').split(':')[1])
    if (process.send) {
      process.send({ port: port })
    }
  })
})

tor.on('error', function (err) {
  if (process.send) {
    process.send({ error: err })
  }
})
