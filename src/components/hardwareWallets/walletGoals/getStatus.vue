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
    <v-col v-if='checkFailed' cols='12'>
      <v-row
        align="center"
        justify="center"
        class="mt-5"
      >
      <v-col
        cols="6"
      >
      <v-alert
          dark
          type="error"
          border="left"
        >
        Ensure that wallet is unlocked and Refresh Page.
        </v-alert>
      </v-col>
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
        this.$emit('goalCompleted', { status })
      } catch (e) {
        this.checkFailed = true
        console.log(e)
      }
    }
  },
  computed: {
  },
  async mounted () {
    this.getStatus()
  }
}
</script>
