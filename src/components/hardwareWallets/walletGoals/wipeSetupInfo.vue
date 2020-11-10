<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Check HW for Wiping Information <br>
            Please Unplug and Plugin Device once onscreen process is finished.
          </div>
        </v-col>
      </v-row>
  </v-card>
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
  }),
  methods: {
    wipe: async function () {
      await wipe(this.walletInfo.model, this.walletInfo.path)
      this.$emit('goalCompleted', { wipeDone: true })
    }
  },
  computed: {
  },
  async mounted () {
    this.wipe()
  }
}
</script>
