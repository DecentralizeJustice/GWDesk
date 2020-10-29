<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Getting Wallet Info
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
    emitInfo: function (info) {
      this.$emit('goalCompleted', { info })
    }
  },
  computed: {
  },
  async mounted () {
    this.emitInfo(this.walletInfo)
  }
}
</script>
