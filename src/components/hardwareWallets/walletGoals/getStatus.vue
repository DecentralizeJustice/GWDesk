<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Getting Status
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
  }),
  methods: {
    getStatus: async function () {
      const status = await getStatus()
      return status
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
