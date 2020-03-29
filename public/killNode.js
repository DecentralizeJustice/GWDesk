'use strict'
const find = require('find-process')

async function killSPVNode () {
  try {
    const list = await find('name', 'Guiding-Wallet-bcoinSPVNode-5678', true)
    const pid = list[0].pid
    process.kill(pid)
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit()
  }
}
killSPVNode()
