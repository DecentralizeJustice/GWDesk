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
              <v-row justify="center">
                <v-btn
                  color="purple darken-4"
                  class="mx-2 my-2"
                  v-on:click="changeName()"
                >
                  Select New Wallet Profile
                </v-btn>
              </v-row>
            </v-container>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  listDevices
} from '@/assets/util/hwi/general.js'
import {
  changeName, changePhoto
} from '@/assets/util/trezorCli/general.js'
export default {
  components: {
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    channel: {}
  }),
  methods: {
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
    },
    changeName: async function () {
      this.channel = changeName(this.walletName)
      this.addListeners(this.channel)
    },
    changePhoto: async function () {
      this.channel = changePhoto(this.photoName)
      this.addListeners(this.channel)
    }
  },
  computed: {
  },
  mounted () {
    this.getDevices()
  }
}
</script>
