<template>
  <v-flex xs12>
    <walletTool
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'
    v-if='!done && transSent'
    :key="keyStuff"/>
    <v-btn
      color="purple darken-4"
      v-on:click="sendTransaction()"
      v-show="!done"
    >
      Send Transaction Again
    </v-btn>
  <v-card-text class="justify-center" v-show="done">
      <h2 class="headline" >Transaction Complete</h2>
      <h2 class="title pt-3" >Transaction Id:</h2>
      {{transaction.transactionId}}
  </v-card-text>
  </v-flex>
</template>

<script>
import walletTool from '@/components/hardwareWallets/mainWalletTool.vue'
import {
  validPSBTFromPSBT
} from '@/assets/util/btc/psbtUtil.js'
import {
  deserializeTrans
} from '@/assets/util/btc/electrum/general.js'
export default {
  components: {
    walletTool
  },
  props: ['transaction', 'singleSigInfo', 'masterFingerprint'],
  data: () => ({
    done: false,
    keyStuff: 0,
    transSent: true,
    network: 'testnet',
    goal: 'signTrans',
    goalInfo: { network: '', psbt: '' }
  }),
  computed: {
    transId: function () {
      return this.transaction.transactionId
    }
  },
  methods: {
    sendTransaction: async function () {
      if (this.keyStuff === 0) {
        this.keyStuff = 1
      } else {
        this.keyStuff = 0
      }
    },
    setupSign: async function () {
      const decodedElectrumPsbt = await deserializeTrans(this.transaction.psbt,
        this.singleSigInfo.rpcPort, this.singleSigInfo.rpcUser,
        this.singleSigInfo.rpcPassword)
      const validPSBT = await validPSBTFromPSBT(this.transaction.psbt, decodedElectrumPsbt.data.result, this.masterFingerprint)
      this.goalInfo.network = this.network
      this.goalInfo.psbt = validPSBT
    },
    updateSignedPSBT: function (psbt) {
      this.$emit('updateSignedPSBT', psbt)
    },
    goalCompleted: function (goal, info) {
      if (info.signedTransation !== undefined) {
        this.done = true
        this.updateSignedPSBT(info.signedTransation)
      }
    }
  },
  mounted: async function () {
    this.$emit('updateSignedPSBT', undefined)
    await this.setupSign()
  }
}
</script>
