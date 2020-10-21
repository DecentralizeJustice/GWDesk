<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
            <v-container v-if='hardwareWallets.length === 0'>
              <v-row justify="center">
                <v-col cols="6" justify="center">
                  <v-alert
                    dense
                    border="left"
                    type="info"
                  >
                    Plug In Hardware Wallet
                  </v-alert>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn
                  color="purple darken-4"
                  class="mx-2 my-2"
                  v-on:click="getDevices()"
                >
                  Check For Wallet
                </v-btn>
              </v-row>
            </v-container>
            <v-container v-if='!walletInitialized'>
              <v-row justify="center">
                <v-btn
                  color="blue darken-4"
                  class="mx-2 my-2"
                  v-on:click="setup()"
                >
                  Initialize Wallet
                </v-btn>
              </v-row>
            </v-container>
            <v-container v-if='walletInitialized && hardwareWallets.length !== 0'>
              <v-row justify="center">
                <v-btn
                  color="orange"
                  class="mx-2 my-2"
                  v-on:click="extractWalletInfo()"
                >
                  Export Wallet Info
                </v-btn>
              </v-row>
            </v-container>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  listDevices, setup, getxpub
} from '@/assets/util/hwi/general.js'
import { pubTovpub } from '@/assets/util/btc/pubUtil.js'
import {
  getVersionNumber
} from '@/assets/util/trezorCli/general.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  startDeamon, hardStopDeamon, deleteWallet, unpackElectrum, configDaemon,
  restoreWallet, deleteElectrumFolder, loadWallet // hardStopDeamon, makeRpcRequest,
  // getinfo, requestStopDeamon, listAddresses, listLoadedWallets,
  // listWalletsThatExist, getBalance, getWalletHistory, sendAll, send,
  // broadcastTransaction, getFeeRate, getunusedaddress, walletReady,
  // getTransaction, checkIfNodeProcessRunning
} from '@/assets/util/btc/electrum/general.js'
export default {
  components: {
    // intialize
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    channel: {},
    settingUp: false
  }),
  methods: {
    ...mapActions('hardwareInfo',
      ['updateHardwareWalletInfo']
    ),
    setupElectrum: async function () {
      this.settingUp = true
      await hardStopDeamon()
      await deleteWallet(this.singleSigElectrumName, this.btcSingleSigTestnet.network)
      await deleteElectrumFolder(this.btcSingleSigTestnet.network)
      await unpackElectrum()
      await configDaemon(this.btcSingleSigTestnet.rpcPort, this.btcSingleSigTestnet.rpcUser,
        this.btcSingleSigTestnet.rpcPassword, this.btcSingleSigTestnet.network)
      await startDeamon(this.btcSingleSigTestnet.network)
      await restoreWallet(this.singleSigElectrumName,
        this.singleSigHardwareWalletInfo.vpub, this.btcSingleSigTestnet.rpcport,
        this.btcSingleSigTestnet.rpcuser,
        this.btcSingleSigTestnet.rpcpassword, this.btcSingleSigTestnet.network)
      await loadWallet(this.singleSigElectrumName, this.btcSingleSigTestnet.rpcport,
        this.btcSingleSigTestnet.rpcuser,
        this.btcSingleSigTestnet.rpcpassword, this.btcSingleSigTestnet.network)
      console.log(this.singleSigHardwareWalletInfo.vpub)
      this.settingUp = false
      console.log('done')
    },
    getxpub: async function (model, path, xpubpath) {
      const pub = await getxpub(model, path, xpubpath)
      return pub
    },
    getVersion: async function () {
      const versionNumber = await getVersionNumber()
      return versionNumber
    },
    extractWalletInfo: async function () {
      const hwiInfo = await listDevices()
      const xpubPath = this.singleSigHardwareWalletInfo
      const vpub = await this.getxpub(hwiInfo[0].model, hwiInfo[0].path, xpubPath.vpubPath)
      const convertedvpub = pubTovpub(vpub.xpub)
      const firmwareVersion = await this.getVersion()
      const walletInfo = {
        fingerprint: hwiInfo[0].fingerprint,
        model: hwiInfo[0].model,
        firmwareVersion,
        vpub: convertedvpub
      }
      this.updateHardwareWalletInfo(walletInfo)
      this.setupElectrum()
    },
    setup: async function () {
      this.channel = setup(this.hardwareWallets[0].model, this.hardwareWallets[0].path)
      this.addListeners(this.channel)
    },
    getDevices: async function () {
      const result = await listDevices()
      this.hardwareWallets = result
    },
    addListeners: function (stream) {
      stream.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
      stream.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })
      stream.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    }
  },
  computed: {
    ...mapState('bitcoinInfo', [
      // map this.count to store.state.count
      'btcSingleSigTestnet'
    ]),
    ...mapGetters('hardwareInfo', [
      'singleSigHardwareWalletInfo',
      'singleSigElectrumName'
    ]),
    walletInitialized () {
      if (this.hardwareWallets.length === 0) {
        return true
      }
      if (this.hardwareWallets[0].error === 'Not initialized') {
        return false
      }
      return true
    }
  },
  mounted () {
    this.getDevices()
  }
}
</script>
