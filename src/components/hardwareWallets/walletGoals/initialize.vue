<template>
  <v-row justify="center">
    <v-col cols='8' v-if='!settingup'>
      <v-alert
      type="info"
      >
        Press Continue When Ready to Initialize Hardware Wallet or Restore Wallet.
      </v-alert>
      <v-row justify="center">
        <v-col cols='4'>
          <v-btn
            color="primary"
            @click ='setup()'
          >
            Continue
          </v-btn>
        </v-col>
        <v-col cols='4'>
          <v-btn
            color="orange darken-3"
            @click ='needsToRestore()'
          >
            Restore Wallet
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-if='settingup' cols='12'>
      <v-row
        align="center"
        justify="space-around"
        class="mt-5"
      >
        <v-alert
          type="warning"
          border="left"
        >
          Do not unplug device.
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
        Initializing Wallet...
        </v-alert>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {
  setup
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
    settingup: false
  }),
  methods: {
    needsToRestore: function () {
      this.$emit('goalCompleted', { needsToRestore: true })
    },
    setup: async function () {
      this.settingup = true
      this.channel = await setup(this.walletInfo.model, this.walletInfo.path)
      this.addListeners(this.channel)
    },
    addListeners: function (stream) {
      stream.stdout.on('data', (data) => {
        const info = JSON.parse(data)
        if (info.success) {
          this.$emit('goalCompleted', { initializeSuccess: true })
        }
      })
      stream.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })
      stream.on('close', (code) => {
        if (code === 0) {
          this.$emit('goalCompleted', { initializeSuccess: false })
        }
        console.log(`child process exited with code ${code}`)
      })
    }
  },
  computed: {
  },
  async mounted () {
  }
}
</script>
