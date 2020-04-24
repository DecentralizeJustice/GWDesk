<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-title class="headline justify-center">
              Electrum Dev
            </v-card-title>
            <v-divider class='mb-5'/>
            <div class="text-center">
            <v-btn
              color="orange"
              v-on:click="get()"
              class="mx-2 my-2"
            >
              Test Request
            </v-btn>
            <v-btn
              color="red darken-4"
              v-on:click="unpackFile()"
              class="mx-2 my-2"
            >
              Copy Binary
            </v-btn>
            <v-btn
              color="green"
              v-on:click="startDeamon(network)"
              class="mx-2 my-2"
            >
              Start Daemon
            </v-btn>
            <v-btn
              color="red"
              v-on:click="hardStopDeamon(network)"
              class="mx-2 my-2"
            >
              Hard Stop Daemon
            </v-btn>
            <v-btn
              color="green darken-4"
              v-on:click="softStopDeamon(rpcport, rpcuser, rpcpassword)"
              class="mx-2 my-2"
            >
              Soft Stop Daemon
            </v-btn>
            <v-btn
              color="dark pink"
              v-on:click="configDaemon(rpcport, rpcuser, rpcpassword, network)"
              class="mx-2 my-2"
            >
              Config Daemon
            </v-btn>
            <v-btn
              class="mx-2 my-2"
              color="teal darken-3"
              v-on:click="deleteWallet(walletName, network)"
            >
              Delete Wallet
            </v-btn>
            <v-btn
              color="amber darken-4"
              class="mx-2 my-2"
              v-on:click="getinfo(rpcport, rpcuser, rpcpassword)"
            >
              Get Node Info
            </v-btn>
            <v-btn
              color="brown"
              class="mx-2 my-2"
              v-on:click="restoreWallet(walletName, recoveryInfo, rpcport, rpcuser,
                rpcpassword, network)"
            >
              Restore Wallet
            </v-btn>
            <v-btn
              color="deep-orange darken-2"
              class="mx-2 my-2"
              v-on:click="loadWallet(walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              Load Wallet
            </v-btn>
            <v-btn
              color="light-blue darken-4"
              class="mx-2 my-2"
              v-on:click="listaddresses(walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              List Addresses
            </v-btn>
            <v-btn
              color="lime darken-4"
              class="mx-2 my-2"
              v-on:click="listLoadedWallets(rpcport, rpcuser, rpcpassword)"
            >
              List Loaded Wallets
            </v-btn>
            <v-btn
              color="deep-purple darken-2"
              class="mx-2 my-2"
              v-on:click="listWalletsThatExist(network)"
            >
              List Wallets Exist
            </v-btn>
          </div>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  unpackElectrum, startDeamon, configDaemon, deleteWallet,
  restoreWallet, loadWallet, hardStopDeamon, makeRpcRequest,
  getinfo, requestStopDeamon, listaddresses, listLoadedWallets, listWalletsThatExist
} from '@/assets/util/electrum/general.js'
export default {
  components: {
  },
  data: () => ({
    network: 'testnet',
    rpcport: '7777',
    rpcuser: 'user',
    rpcpassword: '1',
    walletName: 'no',
    recoveryInfo: 'vpub5YhwwGPiiVo9JpARL8kog2vhhTQvcM7vtAdVhz8DL9YLHAJVxDnaDCoecdUDBMm2Hd4qNBcwUqW61DSXW4mR5G7qkFSNUwL6B6XpotCZeyM'
  }),
  methods: {
    get: async function () {
      try {
        const yes = await makeRpcRequest('listaddresses', { wallet: 'electrumFolder/wallets/no' }, this.rpcport, this.rpcuser, this.rpcpassword)
        console.log(yes.data)
      } catch (error) {
        console.error(error)
      }
    },
    unpackFile: async function () {
      const result = await unpackElectrum()
      console.log(result)
    },
    listWalletsThatExist: async function (network) {
      const results = await listWalletsThatExist(network)
      console.log(results)
    },
    loadWallet: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await loadWallet(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result)
    },
    listaddresses: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await listaddresses(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result)
    },
    listLoadedWallets: async function (rpcport, rpcuser, rpcpassword) {
      const result = await listLoadedWallets(rpcport, rpcuser, rpcpassword)
      console.log(result)
    },
    deleteWallet: async function (walletName, network) {
      const result = await deleteWallet(walletName, network)
      console.log(result)
    },
    getinfo: async function (rpcport, rpcuser, rpcpassword) {
      const result = await getinfo(rpcport, rpcuser, rpcpassword)
      console.log(result)
    },
    restoreWallet: async function (walletName, recoveryInfo, rpcport, rpcuser,
      rpcpassword, network) {
      const result = await restoreWallet(walletName, recoveryInfo, rpcport, rpcuser,
        rpcpassword, network)
      console.log(result)
    },
    startDeamon: async function (network) {
      const result = await startDeamon(network)
      console.log(result)
    },
    hardStopDeamon: async function (network) {
      const result = await hardStopDeamon(network)
      console.log(result)
    },
    softStopDeamon: async function (rpcport, rpcuser, rpcpassword) {
      const result = await requestStopDeamon(rpcport, rpcuser, rpcpassword)
      console.log(result)
    },
    configDaemon: async function (rpcport, rpcuser, rpcpassword, network) {
      const result = await configDaemon(rpcport, rpcuser, rpcpassword, network)
      console.log(result)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
