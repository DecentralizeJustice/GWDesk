<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col v-if='readyToRestore'>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Restoring Wallet
          </div>
        </v-col>
        <v-col v-if='!readyToRestore'>
          Restore Wallet When Ready
          <v-btn
            color="primary"
            @click ='restoreWallet()'
          >
            Restore Wallet
          </v-btn>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import {
  restore
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
    readyToRestore: false
  }),
  methods: {
    restoreWallet: async function () {
      this.readyToRestore = true
      this.channel = await restore(this.walletInfo.model, this.walletInfo.path)
      this.addListeners(this.channel)
    },
    addListeners: function (stream) {
      stream.stdout.on('data', (data) => {
        const info = JSON.parse(data)
        if (info.success) {
          this.$emit('goalCompleted', { restoreSuccess: true })
        }
      })
      stream.stderr.on('data', (data) => {
        // console.error(`stderr: ${data}`)
      })
      stream.on('close', (code) => {
        if (code === 0) {
          this.$emit('goalCompleted', { restoreSuccess: false })
        }
        // console.log(`child process exited with code ${code}`)
      })
    }
  },
  computed: {
  },
  async mounted () {
  }
}
</script>
