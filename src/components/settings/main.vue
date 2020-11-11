<template>
  <div>
    <mainWalletComp
    v-if='!incorrectWallet && !syncingWallet && !needsToBeSetup'
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'/>
    <syncNewWallet
    v-if='syncingWallet'
    v-on:syncDone='syncingWallet = false'/>
    <setupWallet
    v-if='needsToBeSetup'
    v-on:hwWalletSetup='hwSetup'/>
    <v-col cols='12' v-if='incorrectWallet && !syncingWallet && !needsToBeSetup'>
      <v-row justify="center">
        This Is Not The Synced Wallet. <br>
        Plug In Correct Wallet or sync this hardware wallet.
      </v-row>
      <v-row
        align="center"
        justify="center"
        class="mt-5"
      >
        <v-btn
        @click='syncingWallet = true'
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
    syncingWallet: false,
    needsToBeSetup: false,
    goal: 'getStatus',
    goalInfo: {}
  }),
  methods: {
    proccessFingerPrintInfo: async function (matchResult) {
      if (!matchResult) {
        this.incorrectWallet = true
      } else {
        this.goal = 'manageWallet'
      }
    },
    hwSetup: function () {
      this.goal = 'getStatus'
      this.needsToBeSetup = false
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
    ])
  },
  mounted () {
  }
}
</script>
