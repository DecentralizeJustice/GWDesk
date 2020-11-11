<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center" v-if='!needsBootLoaderMode && !firstContinue'>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            !!! Do not Unplug Device !!!
            Installing Firmware
          </div>
          <div class="text-center" v-if='needsBootLoaderMode && !firstContinue'>
            Place Device Into Bootloader Mode and Continue
            <v-btn
              color="orange"
              v-on:click="install()"
            >
              Continue
            </v-btn>
          </div>
          <div class="text-center" v-if='firstContinue'>
            Press continue to install firmware.
            <v-btn
              color="orange"
              v-on:click="firstInstall()"
            >
              Continue
            </v-btn>
          </div>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import {
  updateFirmware
} from '@/assets/util/trezorCli/general.js'
import hwInfo from '@/assets/constants/hwConstants.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
    channel: {},
    needsBootLoaderMode: false,
    firstContinue: true
  }),
  methods: {
    firstInstall: async function () {
      this.firstContinue = false
      await this.isntall()
    },
    install: async function () {
      this.needsBootLoaderMode = false
      this.channel = await updateFirmware(this.mostRecentWalletVersion)
      this.addListeners(this.channel)
    },
    addListeners: function (stream) {
      stream.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
      stream.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })
      stream.on('close', (code) => {
        if (code === 0) {
          this.$emit('goalCompleted', { installSuccess: true })
        } else {
          this.needsBootLoaderMode = true
        }
      })
    }
  },
  computed: {
    mostRecentWalletVersion: function () {
      return hwInfo.hwWalletVersions.trezorT
    }
  },
  async mounted () {
  }
}
</script>
