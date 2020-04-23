<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-title class="headline justify-center">
              Electrum Dev
            </v-card-title>
            <v-btn
              color="orange"
              v-on:click="get()"
            >
              Test Request
            </v-btn>
            <v-btn
              color="pink"
              v-on:click="unpackFile()"
            >
              Copy Binary
            </v-btn>
            <v-btn
              color="green"
              v-on:click="daemonControl('start')"
            >
              Start Daemon
            </v-btn>
            <v-btn
              color="red"
              v-on:click="daemonControl('stop')"
            >
              Stop Daemon
            </v-btn>
            <v-btn
              color="dark pink"
              v-on:click="configDaemon()"
            >
              Config Daemon
            </v-btn>
            <v-btn
              color="dark pink"
              v-on:click="deleteWallet(walletName)"
            >
              Delete Wallet
            </v-btn>
            <v-btn
              color="brown"
              v-on:click="restoreWallet(walletName, recoveryInfo)"
            >
              Restore Wallet
            </v-btn>
            <v-btn
              color="brown"
              v-on:click="loadWallet(walletName)"
            >
              Load Wallet
            </v-btn>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  unpackElectrum, daemonControl, configDaemon, deleteWallet,
  restoreWallet, loadWallet
} from '@/assets/util/electrum/general.js'
const axios = require('axios')
const crypto = require('crypto')
export default {
  components: {
  },
  data: () => ({
    walletName: 'no',
    recoveryInfo: 'zpub6s6rVfipFin9ckR2yotyoNf978XkhoLHEkK9bZWdVqUx35Aw3UC7SpmN1RLsxMzoKmYRJcgUKN93iY1CKFqiqy1nJevw89TEXWx39AdmHZy'
  }),
  methods: {
    get: async function () {
      try {
        const data = {
          method: 'getinfo',
          params: {},
          jsonrpc: '2.0'
        }
        data.id = 'curlText'
        crypto
          .createHash('sha256')
          .update(JSON.stringify(data) + Date.now(), 'utf8')
          .digest('hex')
        const yes = await axios.post('http://127.0.0.1:7777', data, {
          auth: {
            username: 'user',
            password: '1'
          }
        }
        )
        console.log(yes.data.result)
      } catch (error) {
        console.log('ran')
        console.error(error)
      }
    },
    unpackFile: async function () {
      const result = await unpackElectrum()
      console.log(result)
    },
    loadWallet: async function (walletName) {
      const result = await loadWallet(walletName)
      console.log(result)
    },
    deleteWallet: async function (walletName) {
      const result = await deleteWallet(walletName)
      console.log(result)
    },
    restoreWallet: async function (walletName, recoveryInfo) {
      const result = await restoreWallet(walletName, recoveryInfo)
      console.log(result)
    },
    daemonControl: async function (command) {
      const result = await daemonControl(command)
      console.log(result)
    },
    configDaemon: async function () {
      const result = await configDaemon('7777', 'user', '1')
      console.log(result)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
