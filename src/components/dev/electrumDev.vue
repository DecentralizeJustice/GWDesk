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
              color="teal darken-1"
              v-on:click="broadcastTransaction(hex, rpcport, rpcuser, rpcpassword)"
              class="mx-2 my-2"
            >
              Broadcast Transaction
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
              v-on:click="sendAll(destinationArray[0], walletName, rpcport, rpcuser, rpcpassword, network)"
            >
              Send All
            </v-btn>
            <v-btn
              color="light-blue darken-4"
              class="mx-2 my-2"
              v-on:click="send(feeRate,amountArray, destinationArray, walletName, rpcport, rpcuser, rpcpassword, network)"
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
            <v-btn
              color="amber darken-4"
              class="mx-2 my-2"
              v-on:click="getFeeRate(withinBlock, rpcport, rpcuser, rpcpassword)"
            >
              Get Fee Rate
            </v-btn>
            <v-btn
              color="lime darken-4"
              class="mx-2 my-2"
              v-on:click="getunusedaddress(walletName, network, rpcport, rpcuser, rpcpassword)"
            >
              Get Unused Address
            </v-btn>
            <v-btn
              color="grey darken-3"
              class="mx-2 my-2"
              v-on:click="walletReady(walletName, network, rpcport, rpcuser, rpcpassword)"
            >
              Wallet Ready?
            </v-btn>
            <v-btn
              color="red darken-3"
              class="mx-2 my-2"
              v-on:click="getTransaction(transId, rpcport, rpcuser, rpcpassword)"
            >
              Get Transaction
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
  listWalletsThatExist, getBalance, getWalletHistory, sendAll, send,
  broadcastTransaction, getFeeRate, getunusedaddress, walletReady, getTransaction
} from '@/assets/util/btc/electrum/general.js'
export default {
  components: {
  },
  data: () => ({
    feeRate: 1.8,
    withinBlock: '1',
    amountArray: ['0.00001'],
    destinationArray: ['2NGZrVvZG92qGYqzTLjCAewvPZ7JE8S8VxE'],
    network: 'testnet',
    rpcport: '7777',
    rpcuser: 'user',
    rpcpassword: '1',
    walletName: 'no',
    transId: 'b403bdaa673afd92eba80c22bce8166e0bcac8bda3e02ed7d49c2d9fcfebed43',
    recoveryInfo: 'vpub5Y3LsqvBH22zW2oF1V1bTHk47Br3vbETwpNMFX7xgBe9LptUayqwpGYwwBBm23GLUp3otGM5tECqy844sPWiUBTJVckTNtXyySTu18cFHVy',
    hex: '02000000000101f5fa3ecbae0cbc84ebc5e527e479b118afbbdcb1192b9ee46d0549fc6f11bd730100000000fdffffff0235040000000000001600144838adc22e8c00b76737aed7d87a4c1a7e07529ed00700000000000017a914ffd0dbb44402d5f8f12d9ba5b484a2c1bb47da428702483045022100b3d5e2ae31521a78311a059ccb29dde42ac4864c01363f1b1e727bc34d924d710220688be7be8531fef33119580ed9d8fab50170b97973ebe441dbe9982dcc748337012103e7003a77c616c0099ea07777d7c20d06b374ed0e5a74348cb857fb94e1ba1fa61d471a00'
  }),
  methods: {
    get: async function () {
      try {
        const yes = await makeRpcRequest('gettransaction',
          {
            txid: '4eba48267b58220a214fc61c2ff674e8620fd5efe8510dec686ca584ef608e07'
          },
          this.rpcport, this.rpcuser, this.rpcpassword)
        console.log(yes.data.result)
      } catch (error) {
        console.error(error)
      }
    },
    getunusedaddress: async function (walletName, network, rpcport, rpcuser, rpcpassword) {
      const result = await getunusedaddress(walletName, network, rpcport, rpcuser, rpcpassword)
      console.log(result.data.result)
    },
    unpackFile: async function () {
      const result = await unpackElectrum()
      console.log(result)
    },
    getTransaction: async function (transId, rpcport, rpcuser, rpcpassword) {
      const result = await getTransaction(transId, rpcport, rpcuser, rpcpassword)
      console.log(result.data.result)
    },
    listWalletsThatExist: async function (network) {
      const results = await listWalletsThatExist(network)
      console.log(results)
    },
    walletReady: async function (walletName, network, rpcport, rpcuser, rpcpassword) {
      const result = await walletReady(walletName, network, rpcport, rpcuser, rpcpassword)
      console.log(result.data.result)
    },
    loadWallet: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await loadWallet(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    getFeeRate: async function (withinBlock, rpcport, rpcuser, rpcpassword) {
      const result = await getFeeRate(withinBlock, rpcport, rpcuser, rpcpassword)
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
    send: async function (feerate, amountArray, destinationArray, walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await send(feerate, amountArray, destinationArray, walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    getBalance: async function (walletName, rpcport, rpcuser, rpcpassword, network) {
      const result = await getBalance(walletName, rpcport, rpcuser, rpcpassword, network)
      console.log(result.data.result)
    },
    broadcastTransaction: async function (hex, rpcport, rpcuser, rpcpassword) {
      const result = await broadcastTransaction(hex, rpcport, rpcuser, rpcpassword)
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
      console.log(result.data)
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

<style scoped>
</style>
