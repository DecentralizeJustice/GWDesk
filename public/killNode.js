'use strict'
const find = require('find-process')

async function killSPVNode () {
  const list = await find('name', 'Guide-Wallet-bcoinSPVNode-2012', true)
  const pid = list[0].pid
  process.kill(pid)
  process.exit()
}
killSPVNode()
