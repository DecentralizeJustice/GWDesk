
<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Showing Address On Wallet
          </div>
        </v-col>
      </v-row>
  </v-card>
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
