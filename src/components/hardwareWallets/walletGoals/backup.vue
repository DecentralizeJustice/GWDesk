<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Check Device for Backup Info, Do not unplug device!!!
          </div>
        </v-col>
      </v-row>
  </v-card>
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
