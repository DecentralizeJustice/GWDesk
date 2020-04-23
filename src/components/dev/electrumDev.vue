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
              v-on:click="startDeamon()"
            >
              Start Daemon
            </v-btn>
            <v-btn
              color="red"
              v-on:click="stopDeamon()"
            >
              Hard Stop Daemon
            </v-btn>
            <v-btn
              color="dark pink"
              v-on:click="configDaemon(rpcport, rpcuser, rpcpassword)"
            >
              Config Daemon
            </v-btn>
            <v-btn
              color="teal darken-3"
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
              color="deep-orange darken-2"
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
  unpackElectrum, startDeamon, configDaemon, deleteWallet,
  restoreWallet, loadWallet, hardStopDeamon, makeRpcRequest
} from '@/assets/util/electrum/general.js'
export default {
  components: {
  },
  data: () => ({
    rpcport: '7777',
    rpcuser: 'user',
    rpcpassword: '1',
    walletName: 'no',
    recoveryInfo: 'zpub6s6rVfipFin9ckR2yotyoNf978XkhoLHEkK9bZWdVqUx35Aw3UC7SpmN1RLsxMzoKmYRJcgUKN93iY1CKFqiqy1nJevw89TEXWx39AdmHZy'
  }),
  methods: {
    get: async function () {
      try {
        const yes = await makeRpcRequest('getinfo', {}, this.rpcport, this.rpcuser, this.rpcpassword)
        console.log(yes.data)
      } catch (error) {
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
    startDeamon: async function () {
      const result = await startDeamon()
      console.log(result)
    },
    stopDeamon: async function () {
      const result = await hardStopDeamon()
      console.log(result)
    },
    configDaemon: async function (rpcport, rpcuser, rpcpassword) {
      const result = await configDaemon(rpcport, rpcuser, rpcpassword)
      console.log(result)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
