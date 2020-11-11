<template>
  <v-row justify="center">
    <v-col class="text-center" v-if='!needsBootLoaderMode && !firstContinue'>
      <v-row
        align="center"
        justify="space-around"
        class="mt-5"
      >
      <v-alert
          dark
          type="warning"
          border="left"
        >
        Do Not Unplug Wallet
        </v-alert>
      </v-row>
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
        Installing Firmware...
        </v-alert>
      </v-row>
    </v-col>
    <v-col class="text-center" v-if='needsBootLoaderMode && !firstContinue'>
      <v-row
        align="center"
        justify="space-around"
        class="mt-5"
      >
      <v-alert
          dark
          type="info"
          border="left"
        >
        Place Device Into Bootloader Mode and Continue
        </v-alert>
      </v-row>
      <v-row
        align="center"
        justify="space-around"
      >
      <v-btn
        color="primary"
        v-on:click="install()"
      >
        Continue
      </v-btn>
    </v-row>
    </v-col>
    <v-col class="text-center" v-if='firstContinue'>
      <v-row
        align="center"
        justify="space-around"
        class="mt-5"
      >
        <v-alert
            dark
            type="info"
            border="left"
          >
          Press continue to install firmware.
        </v-alert>
      </v-row>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-btn
          color="primary"
          v-on:click="firstInstall()"
        >
          Continue
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
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
      await this.install()
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
