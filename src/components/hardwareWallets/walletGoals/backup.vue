<template>
  <v-col  cols='12'>
    <v-row
      align="center"
      justify="space-around"
      class="mt-5"
    >
    <v-alert
        type="warning"
        border="left"
      >
      Do not unplug device!!!
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
      Check Device for Backup Info.
      </v-alert>
    </v-row>
  </v-col>
</template>

<script>
import {
  backup
} from '@/assets/util/trezorCli/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    backupFunc: async function () {
      const result = await backup()
      if (result === 'Seed successfully backed up') {
        this.$emit('goalCompleted', { backupSuccess: true })
      }
    }
  },
  computed: {
  },
  async mounted () {
    await this.backupFunc()
  }
}
</script>
