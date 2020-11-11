<template>
  <v-col cols='12'>
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
      Checking Wallet Fingerprint...
      </v-alert>
    </v-row>
  </v-col>
</template>

<script>
import {
  listDevices
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    emitResult: function (result) {
      this.$emit('goalCompleted', { result })
    }
  },
  computed: {
  },
  async mounted () {
    const test = await listDevices()
    const result = (this.goalInfo.fingerprint === test[0].fingerprint)
    this.emitResult(result)
  }
}
</script>
