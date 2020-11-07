<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Checking Wallet Fingerprint
          </div>
        </v-col>
      </v-row>
  </v-card>
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
