<template>
          <v-card flat>
            <v-container>
              <v-row justify="space-around">
                <v-col cols="6">
                  <v-alert v-if='hardwareWallets.length === 0'
                    dense
                    border="left"
                    type="warning"
                  >
                    'My Trezor' Wallet Not Found
                  </v-alert>
                </v-col>
              </v-row>
              <v-row justify="space-around">
                <v-col  v-for="(wallet, index) in hardwareWallets" cols="6"
                  v-bind:key="index">
                  <component
                  v-bind:is="correctComponent(wallet.model)"
                  v-bind:walletInfo='hardwareWallets[0]'
                  v-on:walletReady='walletReady'
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
</template>

<script>
import {
  listDevices
} from '@/assets/util/hwi/general.js'
import trezorOne from '@/components/dev/trezorOneCard.vue'
import trezorT from '@/components/hardwareWallets/trezorT.vue'

export default {
  components: {
  },
  data: () => ({
    hardwareWallets: []
  }),
  methods: {
    getDevices: async function () {
      const result = await listDevices()
      this.hardwareWallets = result
    },
    correctComponent: function (info) {
      if (info === 'trezor_t') {
        return trezorT
      }
      if (info === 'trezor_1') {
        return trezorOne
      }
      console.log('Unknown Wallet')
    },
    walletReady: function (walletInfo) {
      this.$emit('walletReady', walletInfo)
    }
  },
  computed: {
  },
  mounted () {
    this.getDevices()
  }
}
</script>
