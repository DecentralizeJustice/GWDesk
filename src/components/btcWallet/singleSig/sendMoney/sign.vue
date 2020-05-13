<template>

      <v-flex xs12>
        <div v-show="walletReady01">
        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline" >Unlock 'My Trezor' Hardware Wallet</h3>
          </div>
        </v-card-title>
        <walletTool
        v-on:walletReady='walletReady'/>
      </div>
      <v-card-title primary-title class="justify-center" v-show="confirm">
        <div>
          <h3 class="headline" >Confirm Transaction on Hardware Wallet</h3>
        </div>
      </v-card-title>
      <v-card-title primary-title class="justify-center" v-show="done">
        <div>
          <h3 class="headline" >Transaction Complete</h3>
        </div>
      </v-card-title>
      </v-flex>

</template>

<script>
import walletTool from '@/components/hardwareWallets/findWallet.vue'
import {
  validPSBTFromPSBT
} from '@/assets/util/btc/psbtUtil.js'
import {
  signTrans
} from '@/assets/util/hwi/general.js'
export default {
  components: {
    walletTool
  },
  props: ['transaction'],
  data: () => ({
    walletReady01: true,
    confirm: false,
    done: false,
    walletInfo: {}
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
      const validPSBT = await validPSBTFromPSBT(this.transaction.psbt)
      const result = await signTrans(this.walletInfo.model, this.walletInfo.path,
        'testnet', validPSBT)
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
