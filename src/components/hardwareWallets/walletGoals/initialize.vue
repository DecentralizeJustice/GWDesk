<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center" v-if='settingup'>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Initializing Wallet <br> Do not unplug device. <br>
            When Process is done on wallet reinsert device.
          </div>
          <div v-if='!settingup'>
          <br>Press Continue When Ready to Initialize Hardware Wallet. or Restore Wallet.
          <v-btn
            color="primary"
            @click ='setup()'
          >
            Continue
          </v-btn>
          <v-btn
            color="primary"
            @click ='needsToRestore()'
          >
            Restore Wallet
          </v-btn>
        </div>
        </v-col>
      </v-row>
  </v-card>
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
