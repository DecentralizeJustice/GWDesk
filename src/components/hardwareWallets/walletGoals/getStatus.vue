<template>
  <v-row justify="space-around">
    <v-col v-if='!checkFailed' cols='12'>
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
        Getting Wallet Status...
        </v-alert>
      </v-row>
    </v-col>
    <v-col v-if='checkFailed'>
      <v-row
        align="center"
        justify="space-around"
      >
      <v-alert
          type="error"
          border="left"
        >
        Error Encountered. Refresh Page.
        </v-alert>
      </v-row>
    </v-col>
  </v-row>
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
