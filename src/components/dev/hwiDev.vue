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
                <v-col  v-for="(wallet, index) in hardwareWallets" cols="4"
                  v-bind:key="index">
                  <walletCard v-bind:walletType="wallet.model"
                  v-bind:walletInfo='wallet'
                  v-on:promptPin="promptPin"
                  v-on:wipe="wipe"
                  v-on:enterPin="enterPin"
                  v-on:setup="setup"/>
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
              v-on:click="test()"
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
  promtpin, enterpin, wipe, setup
} from '@/assets/util/hwi/general.js'
import image from '@/assets/photos/trezor.jpeg'
import walletCard from '@/components/dev/walletCard.vue'

export default {
  components: {
    walletCard
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    image: image,
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
      console.log(this.hardwareWallets)
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
    test: function () {
      this.channel.stdin.write('1234\n')
      // process.stdin.pipe(this.channel.stdin)
    }
  },
  computed: {
  }
}
</script>
