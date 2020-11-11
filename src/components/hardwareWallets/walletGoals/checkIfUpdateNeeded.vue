<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Checking If Update Needed
          </div>
        </v-col>
      </v-row>
  </v-card>
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
