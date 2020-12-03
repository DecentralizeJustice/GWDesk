<template>
  <div>
    <mainWalletComp
    v-if='!incorrectWallet && !needsToSync && !needsToBeSetup'
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'/>
    <syncNewWallet
    v-if='needsToSync'
    v-on:syncDone='afterSync()'/>
    <setupWallet
    v-if='needsToBeSetup'
    v-on:hwWalletSetup='hwSetup'/>
    <v-col cols='12' v-if='incorrectWallet && !needsToSync && !needsToBeSetup'>
      <v-row justify="center">
        <v-alert
          type="info"
          >
          This Is Not The Synced Wallet. <br>
          Plug In Another Wallet or sync this hardware wallet.
        </v-alert>
      </v-row>
      <v-row
        align="center"
        justify="center"
        class="mt-5"
      >
        <v-btn
        @click='needsToSync = true'
          color="primary"
        >
          Sync This Hardware Wallet
        </v-btn>
      </v-row>
      <v-row
        align="center"
        justify="center"
        class="mt-5"
      >
        <v-btn
        @click='incorrectWallet = false'
          color="orange darken-4"
        >
          Plug In Another Wallet
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import {
  listWalletsThatExist
} from '@/assets/util/btc/electrum/general.js'
import syncNewWallet from '@/components/settings/syncNewWallet.vue'
import setupWallet from '@/components/settings/setupWallet.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'mainSettings',
  components: {
    setupWallet,
    syncNewWallet
  },
  data: () => ({
    incorrectWallet: false,
    needsToBeSetup: false,
    needsToSync: false,
    goal: 'getStatus',
    goalInfo: {}
  }),
  methods: {
    proccessFingerPrintInfo: async function (matchResult) {
      if (!matchResult) {
        this.incorrectWallet = true
      } else {
        this.checkIfNeedsSync()
      }
    },
    checkIfNeedsSync: async function () {
      console.log('checking if need sync')
      const wallets = await listWalletsThatExist(this.network)
      if (!wallets.includes(this.singleSigElectrumName)) {
        this.needsToSync = true
      } else {
        this.goal = 'manageWallet'
      }
    },
    afterSync: function () {
      console.log('syncDone')
      this.needsToSync = false
      this.needsToBeSetup = false
      this.incorrectWallet = false
      this.goal = 'getStatus'
    },
    hwSetup: function () {
      this.needsToBeSetup = false
      this.needsToSync = true
    },
    goalCompleted: function (goal, info) {
      if (goal === 'getStatus') {
        if (info.status[0] !== 3) {
          this.needsToBeSetup = true
        } else {
          this.checkIfWalletIsCorrect()
        }
      }
      if (goal === 'checkFingerPrint') {
        this.proccessFingerPrintInfo(info.result)
      }
    },
    checkIfWalletIsCorrect: async function () {
      this.goal = 'checkFingerPrint'
      this.goalInfo.fingerprint = this.singleSigHardwareWalletInfo.fingerprint
    }
  },
  computed: {
    ...mapState('bitcoinInfo', [
      'btcSingleSigTestnet'
    ]),
    ...mapGetters('hardwareInfo', [
      'singleSigHardwareWalletInfo',
      'singleSigElectrumName'
    ]),
    network: function () {
      return this.btcSingleSigTestnet.network
    }
  },
  mounted () {
  }
}
</script>
