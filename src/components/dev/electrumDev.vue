<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
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
              v-on:click="listAddresses(walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              List Addresses
            </v-btn>
            <v-btn
              color="red darken-3"
              class="mx-2 my-2"
              v-on:click="sendAll(destination, walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              Send All
            </v-btn>
            <v-btn
              color="light-blue darken-4"
              class="mx-2 my-2"
              v-on:click="send(amount, destination, walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              Send
            </v-btn>
            <v-btn
              color="blue-grey darken-1"
              class="mx-2 my-2"
              v-on:click="getBalance(walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              Get Balance
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
            <v-btn
              color="deep-orange darken-4"
              class="mx-2 my-2"
              v-on:click="getWalletHistory(walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              Get Wallet History
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
  getinfo, requestStopDeamon, listAddresses, listLoadedWallets,
  listWalletsThatExist, getBalance, getWalletHistory, sendAll, send
} from '@/assets/util/btc/electrum/general.js'
export default {
  components: {
  },
  data: () => ({
    amount: '.00001',
    destination: 'mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt',
    network: 'testnet',
    rpcport: '7777',
    rpcuser: 'user',
    rpcpassword: '1',
    walletName: 'no',
    recoveryInfo: 'vpub5YhwwGPiiVo9JpARL8kog2vhhTQvcM7vtAdVhz8DL9YLHAJVxDnaDCoecdUDBMm2Hd4qNBcwUqW61DSXW4mR5G7qkFSNUwL6B6XpotCZeyM',
    psbt: '020000000106c91cf2b2b23a102fb5a9d7835aa92bf049ba7929be87be7209cdfa7997369c0000000000fdffffff02e8030000000000001976a914344a0f48ca150ec2b903817660b9b68b13a6702688ac28820100000000001600143a3a47786ccff9cf6b512c9cee3774fecda460cc23461a00'
  }),
  methods: {
    get: async function () {
      try {
        const yes = await makeRpcRequest('deserialize',
          {
            tx: this.psbt
          },
          this.rpcport, this.rpcuser, this.rpcpassword)
        console.log(yes.data.result)
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
      console.log(result.data.result)
    },
    listAddresses: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await listAddresses(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    sendAll: async function (destination, walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await sendAll(destination, walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    send: async function (amount, destination, walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await send(amount, destination, walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    getBalance: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await getBalance(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    getWalletHistory: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await getWalletHistory(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    listLoadedWallets: async function (rpcport, rpcuser, rpcpassword) {
      const result = await listLoadedWallets(rpcport, rpcuser, rpcpassword)
      console.log(result.data.result)
    },
    deleteWallet: async function (walletName, network) {
      const result = await deleteWallet(walletName, network)
      console.log(result)
    },
    getinfo: async function (rpcport, rpcuser, rpcpassword) {
      const result = await getinfo(rpcport, rpcuser, rpcpassword)
      console.log(result.data.result)
    },
    restoreWallet: async function (walletName, recoveryInfo, rpcport, rpcuser,
      rpcpassword, network) {
      const result = await restoreWallet(walletName, recoveryInfo, rpcport, rpcuser,
        rpcpassword, network)
      console.log(result.data.result)
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
      console.log(result.data.result)
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
