<template>
  <div>
    <mainWalletComp
    v-if='!allInfoCollected && !done'
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'/>
    <v-row justify="center" v-if='allInfoCollected || done'>
      <v-col cols='6' v-if='done'>
        <v-alert
        type="info"
        >
          Wallet Already Setup. Refresh Page.
        </v-alert>
      </v-col>
      <v-col v-if='settingUpWalletSoftware' cols='12'>
        <v-row
          align="center"
          justify="space-around"
          class="mb-5"
        >
          <v-progress-circular
             indeterminate
             color="primary"
             :size="100"
           ></v-progress-circular>
        </v-row>
        <v-row
          align="center"
          justify="space-around"
          class="mt-5"
        >
          <v-alert
            color="black"
            dark
            type="info"
            border="left"
          >
          Setting Up Wallet Software...
          </v-alert>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
import { pubTovpub } from '@/assets/util/btc/pubUtil.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  startDeamon, hardStopDeamon, deleteWallet, configDaemon,
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
      this.goal = 'getVersion'
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
      // await unpackElectrum()
      await configDaemon(this.btcSingleSigTestnet.rpcPort, this.btcSingleSigTestnet.rpcUser,
        this.btcSingleSigTestnet.rpcPassword, this.btcSingleSigTestnet.network)
      await hardStopDeamon()
      await startDeamon(this.btcSingleSigTestnet.network)
      await hardStopDeamon()
      await startDeamon(this.btcSingleSigTestnet.network)
      console.log(this.singleSigElectrumName,
        this.singleSigHardwareWalletInfo.vpub, this.btcSingleSigTestnet.rpcport,
        this.btcSingleSigTestnet.rpcuser,
        this.btcSingleSigTestnet.rpcpassword, this.btcSingleSigTestnet.network)
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
    console.log(this.btcSingleSigTestnet, this.singleSigHardwareWalletInfo, this.singleSigElectrumName)
  }
}
</script>
