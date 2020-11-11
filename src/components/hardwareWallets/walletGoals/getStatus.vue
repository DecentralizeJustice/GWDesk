<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center" v-if='!checkFailed'>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Getting Wallet Status
          </div>
        </v-col>
        <v-col>
          <div class="text-center" v-if='checkFailed'>
            Error Encountered. Refresh Page.
          </div>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import {
  getStatus
} from '@/assets/util/trezorCli/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
    checkFailed: false
  }),
  methods: {
    getStatus: async function () {
      try {
        const status = await getStatus()
        return status
      } catch (e) {
        this.checkFailed = true
        console.log(e)
      }
    },
    emitStatus: function (status) {
      this.$emit('goalCompleted', { status })
    }
  },
  computed: {
  },
  async mounted () {
    const status = await this.getStatus()
    this.emitStatus(status)
  }
}
</script>
