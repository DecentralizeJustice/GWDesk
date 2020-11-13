<template>
  <v-row justify="space-around">
    <v-col class="text-center">
      <v-row
        align="center"
        justify="space-around"
        class="mt-5"
      >
        <v-alert
            dark
            type="warning"
            border="left"
          >
          Your Wallet Was Setup Incorrectly. If you set it up with Guiding Wallet,
          wipe wallet and attempt to setup again.
          If it was setup with another wallet, use this hardware wallet with that wallet.
        </v-alert>
      </v-row>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-btn
          color="primary"
          v-on:click="emitReady()"
        >
          Wipe and Try to Setup
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
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
