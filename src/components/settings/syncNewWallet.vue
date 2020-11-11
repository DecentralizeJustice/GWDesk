<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
        <mainWalletComp
        v-if='!allInfoCollected && !done'
        v-bind:goal='goal'
        v-bind:goalInfo='goalInfo'
        v-on:goalCompleted='goalCompleted'/>
        <div flat v-if='allInfoCollected || done'>
          <v-container v-if='settingUpWalletSoftware'>
            <v-row justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
              Setting Up Wallet Software
            </v-row>
          </v-container>
          <v-container v-if='done'>
            <v-row justify="center">
              Wallet Already Setup. Refresh Page.
            </v-row>
          </v-container>
          </div>
    </v-flex>
    </v-layout>
</template>

<script>
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
import { pubTovpub } from '@/assets/util/btc/pubUtil.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  startDeamon, hardStopDeamon, deleteWallet, unpackElectrum, configDaemon,
  restoreWallet, deleteElectrumFolder, loadWallet
} from '@/assets/util/btc/electrum/general.js'
export default {
  components: {
    mainWalletComp
  },
  data: () => ({
    allInfoCollected: false,
    settingUpWalletSoftware: false,
    done: false,
    goal: 'extractXpub',
    goalInfo: {},
    vpub: '',
    version: '',
    fingerprint: '',
    model: ''
  }),
  methods: {
    ...mapActions('hardwareInfo',
      ['updateHardwareWalletInfo']
    ),
    setXpub: async function (xpub) {
      const vpub = await pubTovpub(xpub)
      this.vpub = vpub
      if (this.singleSigHardwareWalletInfo.vpub === this.vpub) {
        this.done = true
      } else {
        this.goal = 'getVersion'
      }
    },
    setVersion: async function (version) {
      this.version = version
      this.goal = 'getInfo'
    },
    getWalletInfo: async function (info) {
      this.fingerprint = info.fingerprint
      this.model = info.model
      this.setWalletInfo()
    },
    goalCompleted: function (goal, info) {
      if (goal === 'extractXpub') {
        this.setXpub(info.xpub)
      }
      if (goal === 'getVersion') {
        this.setVersion(info.version)
      }
      if (goal === 'getInfo') {
        this.getWalletInfo(info.info)
      }
    },
    setupComplete: async function () {
      this.$emit('syncDone')
    },
    setupElectrum: async function () {
      this.allInfoCollected = true
      this.settingUpWalletSoftware = true
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
      this.settingUpWalletSoftware = false
      this.setupComplete()
    },
    setWalletInfo: async function () {
      const vpub = this.vpub
      const firmwareVersion = this.version
      const fingerprint = this.fingerprint
      const model = this.model
      const walletInfo = {
        fingerprint,
        model,
        firmwareVersion,
        vpub
      }
      await this.updateHardwareWalletInfo(walletInfo)
      this.setupElectrum()
    }
  },
  computed: {
    ...mapState('bitcoinInfo', [
      'btcSingleSigTestnet'
    ]),
    ...mapGetters('hardwareInfo', [
      'singleSigHardwareWalletInfo',
      'singleSigElectrumName'
    ])
  },
  mounted () {
    this.goalInfo.xpubPath = this.singleSigHardwareWalletInfo.vpubPath
  }
}
</script>
