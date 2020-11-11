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
      Checking If Wallet Updated Needed...
      </v-alert>
    </v-row>
  </v-col>
</template>

<script>
import hwInfo from '@/assets/constants/hwConstants.js'
import {
  getVersionNumber
} from '@/assets/util/trezorCli/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
    mostRecentWalletVersion: function () {
      return hwInfo.hwWalletVersions.trezorT
    }
  },
  async mounted () {
    const walletVersion = await getVersionNumber()
    if (this.mostRecentWalletVersion !== walletVersion) {
      this.$emit('goalCompleted', { walletNeedsUpdate: true })
    } else {
      this.$emit('goalCompleted', { walletNeedsUpdate: false })
    }
  }
}
</script>
