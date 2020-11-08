<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            Your Wallet Was Setup Incorrectly. If it was setup with another wallet, use it with that wallet.
            If you set it up with this wallet, wipe and attempt to setup again.
          </div>
          <v-btn
            color="primary"
            @click='emitReady'
          >
            Wipe and Try to Setup
          </v-btn>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'backupFailed',
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    emitReady: function () {
      this.$emit('goalCompleted', { readyToWipe: true })
    }
  },
  computed: {
  },
  async mounted () {
  }
}
</script>
