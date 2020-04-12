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
                  v-on:restore="restore"
                  v-on:getxpub="getxpub"/>
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
  promtpin, enterpin, wipe, setup, restore,
  getxpub
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
    getxpub: async function (model, path, xpubpath) {
      const pub = await getxpub(model, path, xpubpath)
      console.log(pub)
    },
    promptPin: async function (model, path) {
      const test = await promtpin(model, path)
      console.log(test)
    },
    enterPin: async function (model, path, pin) {
      const test = await enterpin(model, path, pin)
      console.log(test)
    },
    wipe: async function (model, path) {
      const test = await wipe(model, path)
      console.log(test)
    },
    setup: async function (model, path) {
      this.channel = setup(model, path)
      this.addListeners(this.channel)
    },
    restore: async function (model, path) {
      this.channel = restore(model, path)
      this.addListeners(this.channel)
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
    },
    addListeners: function (stream) {
      stream.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
      stream.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })
      stream.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    }
  },
  computed: {
  },
  mounted () {
    this.getDevices()
  }
}
</script>
