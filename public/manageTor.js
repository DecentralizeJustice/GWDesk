'use strict'
const granaxLocation = process.argv[2]
// eslint-disable-next-line
const granax = require(granaxLocation)
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
process.on('message', (m) => {
  if (m.dormant) {
    dormant()
    return
  }
  if (m.circuitEstablished) {
    circuitEstablished()
  }
})
function dormant () {
  tor.getInfo('dormant', (err, result) => {
    process.send({ dormant: result })
    if (err) {
      process.send({ error: err })
    }
  })
}
function circuitEstablished () {
  tor.getInfo('status/circuit-established', (err, result) => {
    process.send({ circuitEstablished: result })
    if (err) {
      process.send({ error: err })
    }
  })
}
