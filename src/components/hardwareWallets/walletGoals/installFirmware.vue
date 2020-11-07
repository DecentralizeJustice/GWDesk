<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            !!! Do not Unplug Device !!!
            Installing Firmware
          </div>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import {
  updateFirmware
} from '@/assets/util/trezorCli/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
    version: '2.1.7',
    channel: {}
  }),
  methods: {
    install: async function () {
      this.channel = await updateFirmware(this.version)
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
          return
        }
        console.log(`child process exited with code ${code}`)
      })
    }
  },
  computed: {
  },
  async mounted () {
    await this.install()
  }
}
</script>
