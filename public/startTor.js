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

tor.on('getInfo', function () {
  if (!process.send) { return }
  tor.getInfo('status/circuit-established', (err, result) => {
    process.send({ getInfo: result })
    if (err) {
      process.send({ error: err })
    }
  })
})
