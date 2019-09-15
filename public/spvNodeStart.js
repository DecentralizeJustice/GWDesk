#!/usr/bin/env node

'use strict'

process.title = 'bcoin'
const nodeInfoLocation = process.argv[2]
const assert = require('assert')
const SPVNode = require('bcoin/lib/node/spvnode')
const Outpoint = require('bcoin/lib/primitives/outpoint')
const node = new SPVNode({
  network: 'testnet',
  file: true,
  argv: true,
  env: true,
  logFile: true,
  logConsole: false,
  logLevel: 'debug',
  db: 'leveldb',
  memory: false,
  persistent: true,
  workers: true,
  listen: true,
  loader: require,
  // 'wallet-watch-only': true,
  cors: true,
  'api-key': 'hunter2',
  prefix: nodeInfoLocation
})

// Temporary hack
if (!node.config.bool('no-wallet') && !node.has('walletdb')) {
  const plugin = require('bcoin/lib/wallet/plugin')
  node.use(plugin)
}

process.on('unhandledRejection', (err, promise) => {
  throw err
})

process.on('SIGINT', async () => {
  await node.close()
});

(async () => {
  await node.ensure()
  await node.open()
  await node.connect()

  if (node.config.bool('test')) {
    node.pool.watchAddress('1VayNert3x1KzbpzMGt2qdqrAThiRovi8')
    node.pool.watchOutpoint(new Outpoint())
    node.on('block', (block) => {
      assert(block.txs.length >= 1)
      if (block.txs.length > 1) {
        console.log(block.txs[1])
      }
    })
  }

  node.startSync()
})().catch((err) => {
  console.error(err.stack)
  process.exit(1)
})
