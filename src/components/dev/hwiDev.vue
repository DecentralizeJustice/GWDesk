<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-title class="headline justify-center">
              Hardware Wallet Interface BTC Dev Panel
            </v-card-title>
            <v-container>
              <v-row justify="space-around">
                <v-col cols="6">
                  <v-alert v-if='hardwareWallets.length === 0'
                    dense
                    border="left"
                    type="warning"
                  >
                    No Wallets Recognized
                  </v-alert>
                </v-col>
              </v-row>
              <v-row justify="space-around">
                <v-col  v-for="(wallet, index) in hardwareWallets" cols="6"
                  v-bind:key="index">
                  <component
                  v-bind:is="correctComponent(wallet.model)"
                  v-bind:walletInfo='wallet'
                  v-on:promptPin="promptPin"
                  v-on:wipe="wipe"
                  v-on:enterPin="enterPin"
                  v-on:setup="setup"
                  v-on:enter="write"
                  v-on:restore="restore"/>
                </v-col>
              </v-row>
            </v-container>
            <v-divider/>
            <v-btn
              color="orange"
              text
              v-on:click="unpack()"
            >
              Unpack Binary
            </v-btn>
            <v-btn
              color="orange"
              text
              v-on:click="getDevices()"
            >
              Scan For Devices
            </v-btn>
            <v-btn
              color="orange"
              text
              v-on:click="write('1234')"
            >
              Test
            </v-btn>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  unpackBinary, listDevices,
  promtpin, enterpin, wipe, setup, restore
} from '@/assets/util/hwi/general.js'
import trezorOne from '@/components/dev/trezorOneCard.vue'
import trezorT from '@/components/dev/trezorT.vue'

export default {
  components: {
    trezorOne
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    channel: {}
  }),
  methods: {
    unpack: async function () {
      await unpackBinary()
      console.log('binary ready')
    },
    getDevices: async function () {
      const test = await listDevices()
      this.hardwareWallets = test
    },
    promptPin: async function (brand, path) {
      const test = await promtpin(brand, path)
      console.log(test)
    },
    enterPin: async function (brand, path, pin) {
      const test = await enterpin(brand, path, pin)
      console.log(test)
    },
    wipe: async function (brand, path) {
      const test = await wipe(brand, path)
      console.log(test)
    },
    setup: async function (brand, path) {
      this.channel = setup(brand, path)
    },
    restore: async function (brand, path) {
      this.channel = restore(brand, path)
    },
    write: function (string) {
      this.channel.stdin.write(string + '\n')
    },
    correctComponent: function (info) {
      if (info === 'trezor_t') {
        return trezorT
      }
      if (info === 'trezor_1') {
        return trezorOne
      }
      console.log('Unknown Wallet')
    }
  },
  computed: {
  },
  mounted () {
    this.getDevices()
  }
}
</script>
