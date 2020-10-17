<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
            <v-container v-if='hardwareWallets.length === 0'>
              <v-row justify="center">
                <v-col cols="6" justify="center">
                  <v-alert
                    dense
                    border="left"
                    type="info"
                  >
                    Plug In Hardware Wallet
                  </v-alert>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn
                  color="purple darken-4"
                  class="mx-2 my-2"
                  v-on:click="getDevices()"
                >
                  Check For Wallet
                </v-btn>
              </v-row>
            </v-container>
            <v-container v-if='!walletInitialized'>
              <v-row justify="center">
                <v-btn
                  color="blue darken-4"
                  class="mx-2 my-2"
                  v-on:click="setup()"
                >
                  Initialize Wallet
                </v-btn>
              </v-row>
            </v-container>
            <v-container v-if='walletInitialized && hardwareWallets.length !== 0'>
              <v-row justify="center">
                <v-btn
                  color="orange"
                  class="mx-2 my-2"
                  v-on:click="extractWalletInfo()"
                >
                  Export Wallet Info
                </v-btn>
              </v-row>
            </v-container>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  listDevices, setup, getxpub
} from '@/assets/util/hwi/general.js'
// import intialize from '@/components/hardwareWallets/initializeWallet.vue'
// import { createNamespacedHelpers } from 'vuex'
import { pubTovpub } from '@/assets/util/btc/pubUtil.js'
import {
  getVersionNumber
} from '@/assets/util/trezorCli/general.js'
import { mapActions, mapGetters } from 'vuex'// = createNamespacedHelpers('hardwareInfo')
export default {
  components: {
    // intialize
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    channel: {}
  }),
  methods: {
    ...mapActions('hardwareInfo',
      ['updateHardwareWalletInfo']
    ),
    getxpub: async function (model, path, xpubpath) {
      const pub = await getxpub(model, path, xpubpath)
      return pub
    },
    getVersion: async function () {
      const versionNumber = await getVersionNumber()
      return versionNumber
    },
    extractWalletInfo: async function () {
      const hwiInfo = await listDevices()
      const xpubPath = this.singleSigHardwareWalletInfo
      const vpub = await this.getxpub(hwiInfo[0].model, hwiInfo[0].path, xpubPath.vpubPath)
      const convertedvpub = pubTovpub(vpub.xpub)
      const firmwareVersion = await this.getVersion()
      const walletInfo = {
        fingerprint: hwiInfo[0].fingerprint,
        model: hwiInfo[0].model,
        firmwareVersion,
        vpub: convertedvpub
      }
      this.updateHardwareWalletInfo(walletInfo)
    },
    setup: async function () {
      this.channel = setup(this.hardwareWallets[0].model, this.hardwareWallets[0].path)
      this.addListeners(this.channel)
    },
    getDevices: async function () {
      const result = await listDevices()
      this.hardwareWallets = result
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
    ...mapGetters('hardwareInfo', [
      'singleSigHardwareWalletInfo'
    ]),
    walletInitialized () {
      if (this.hardwareWallets.length === 0) {
        return true
      }
      if (this.hardwareWallets[0].error === 'Not initialized') {
        return false
      }
      return true
    }
  },
  mounted () {
    console.log(this.singleSigHardwareWalletInfo)
    this.getDevices()
  }
}
</script>
