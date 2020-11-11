<template>
  <div>
    <v-col justify="center" v-if='!wiping' cols='12'>
      <v-row justify="center">
        <v-col cols='6'>
          <v-alert
          type="info"
          >
            Press Continue when ready to wipe wallet.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
          <v-btn
            color="primary"
            @click ='wipe()'
          >
            Continue
          </v-btn>
      </v-row>
    </v-col>
    <v-col v-if='wiping' cols='12'>
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
        Check HW for Wiping Information...
        </v-alert>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import {
  wipe
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
    wiping: false
  }),
  methods: {
    wipe: async function () {
      this.wiping = true
      await wipe(this.walletInfo.model, this.walletInfo.path)
      this.$emit('goalCompleted', { wipeDone: true })
    }
  },
  computed: {
  },
  async mounted () {
  }
}
</script>
