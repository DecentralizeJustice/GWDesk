<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Initializing Wallet <br>
            Please Unplug and Plugin Device once onscreen process is finished.
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
  }),
  methods: {
    setup: async function () {
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
    }
  },
  computed: {
  },
  async mounted () {
    await this.setup()
  }
}
</script>
