
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
      Showing Address On Wallet...
      </v-alert>
    </v-row>
  </v-col>
</template>

<script>
import {
  displayAddress
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    displayAddress: async function () {
      displayAddress(this.walletInfo.model, this.walletInfo.path,
        this.goalInfo.path, this.goalInfo.network)
    },
    emitAddress: function () {
      this.$emit('goalCompleted')
    }
  },
  computed: {
  },
  async mounted () {
    if (this.goalInfo.masterFingerprint === this.walletInfo.fingerprint) {
      await this.displayAddress()
      this.emitAddress()
      return
    }
    console.log('wrong wallet', this.goalInfo.masterFingerprint, this.walletInfo.fingerprint)
  }
}
</script>
