<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
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
                  v-on:getxpub="getxpub"
                  v-on:displayAddress='displayAddress'
                  v-on:signTrans='signTrans'/>
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
  unpackBinary, listDevices, signTrans,
  promtpin, enterpin, wipe, setup, restore,
  getxpub, displayAddress
} from '@/assets/util/hwi/general.js'
import trezorOne from '@/components/dev/trezorOneCard.vue'
import trezorT from '@/components/dev/trezorT.vue'

export default {
  components: {
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    channel: {},
    network: 'testnet',
    xpubpath: 'm/84h/1h/0h',
    addressPath: 'm/84h/1h/0h/0/1',
    psbt: 'cHNidP8BAHICAAAAAfX6PsuuDLyE68XlJ+R5sRivu9yxGSue5G0FSfxvEb1zAQAAAAD9////AjUEAAAAAAAAFgAUSDitwi6MALdnN67X2HpMGn4HUp7QBwAAAAAAABepFP/Q27REAtX48S2bpbSEosG7R9pChwAAAAAAAQEf2gwAAAAAAAAWABQ6Okd4bM/5z2tRLJzuN3T+zaRgzCIGA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mGK6qJWRUAACAAQAAgAAAAIABAAAAAAAAAAAiAgOkieFQPL5thWHFvSIeXGeDCTE39GKLDHaiULYexuryKBiuqiVkVAAAgAEAAIAAAACAAQAAAAEAAAAAAA=='

  }),
  methods: {
    unpack: async function () {
      const results = await unpackBinary()
      console.log(results)
    },
    getDevices: async function () {
      const result = await listDevices()
      this.hardwareWallets = result
    },
    signTrans: async function (model, path) {
      const result = await signTrans(model, path, this.network, this.psbt)
      console.log(result.psbt)
    },
    getxpub: async function (model, path) {
      const pub = await getxpub(model, path, this.xpubpath)
      console.log(pub)
    },
    displayAddress: async function (model, path, addressPath) {
      const pub = await displayAddress(model, path, this.addressPath, this.network)
      console.log(pub)
    },
    promptPin: async function (model, path) {
      const result = await promtpin(model, path)
      console.log(result)
    },
    enterPin: async function (model, path, pin) {
      const result = await enterpin(model, path, pin)
      console.log(result)
    },
    wipe: async function (model, path) {
      const result = await wipe(model, path)
      console.log(result)
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
