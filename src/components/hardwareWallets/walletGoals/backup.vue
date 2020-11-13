<template>
  <v-row align="center"
  justify="center">
    <v-col  cols='12' v-if='readyToBackup'>
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
    <v-col cols='8' v-if='!readyToBackup'>
      <v-alert
      type="info"
      >
        Press Continue When Ready to Backup Wallet.
      </v-alert>
      <v-row justify="center">
        <v-col cols='4'>
          <v-btn
            color="primary"
            @click ='backupFunc()'
          >
            Continue
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
    readyToBackup: false
  }),
  methods: {
    backupFunc: async function () {
      this.readyToBackup = true
      const result = await backup()
      if (result === 'Seed successfully backed up') {
        this.$emit('goalCompleted', { backupSuccess: true })
      }
      this.$emit('goalCompleted', { backupSuccess: false })
    }
  },
  computed: {
  },
  async mounted () {
  }
}
</script>
