<template>

      <v-flex xs12>
        <div v-show="walletReady01">
        <v-card-text primary-title class="justify-center">
          <div>
            <h3 class="headline" >Unlock 'My Trezor' Hardware Wallet</h3>
          </div>
        </v-card-text>
        <walletTool
        v-on:walletReady='walletReady'/>
      </div>
      <v-card-text primary-title class="justify-center" v-show="confirm">
          <h3 class="headline" >Confirm Transaction on Hardware Wallet</h3>
      </v-card-text>
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
  signTrans
} from '@/assets/util/hwi/general.js'
import {
  deserializeTrans
} from '@/assets/util/btc/electrum/general.js'
export default {
  components: {
    walletTool
  },
  props: ['transaction', 'singleSigInfo', 'masterFingerprint'],
  data: () => ({
    walletReady01: true,
    confirm: false,
    done: false,
    walletInfo: {},
    network: 'testnet'
  }),
  computed: {
    transId: function () {
      return this.transaction.transactionId
    }
  },
  methods: {
    walletReady: function (walletInfo) {
      this.walletReady01 = false
      this.confirm = true
      this.walletInfo = walletInfo
      this.sign()
    },
    sign: async function () {
      const decodedElectrumPsbt = await deserializeTrans(this.transaction.psbt,
        this.singleSigInfo.rpcPort, this.singleSigInfo.rpcUser,
        this.singleSigInfo.rpcPassword)
      const validPSBT = await validPSBTFromPSBT(this.transaction.psbt, decodedElectrumPsbt.data.result, this.masterFingerprint)
      const result = await signTrans(this.walletInfo.model, this.walletInfo.path,
        this.network, validPSBT)
      this.confirm = false
      this.done = true
      this.updateSignedPSBT(result.psbt)
    },
    updateSignedPSBT: function (psbt) {
      this.$emit('updateSignedPSBT', psbt)
    }
  },
  mounted () {
    this.$emit('updateSignedPSBT', undefined)
  }
}
</script>
