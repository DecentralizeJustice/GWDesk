
<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Sending Transaction to Wallet
          </div>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import {
  signTrans
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    sign: async function () {
      const signedTrans = await signTrans(this.walletInfo.model, this.walletInfo.path,
        this.goalInfo.network, this.goalInfo.psbt)
      return signedTrans
    },
    emitTrans: function (trans) {
      this.$emit('goalCompleted', { signedTransation: trans.psbt })
    }
  },
  computed: {
  },
  async mounted () {
    if (this.goalInfo.masterFingerprint === this.walletInfo.fingerprint) {
      const signedTrans = await this.sign()
      this.emitTrans(signedTrans)
      return
    }
    console.log('wrong wallet', this.goalInfo.masterFingerprint, this.walletInfo.fingerprint)
  }
}
</script>
