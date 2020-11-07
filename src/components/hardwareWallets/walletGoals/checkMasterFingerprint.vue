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
    const result = (this.goalInfo.fingerprint === this.walletInfo.fingerprint)
    this.emitResult(result)
  }
}
</script>
