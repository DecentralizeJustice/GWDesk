
<template>
  <v-col cols='12'>
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
      Sending Transaction to Wallet...
      </v-alert>
    </v-row>
  </v-col>
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
