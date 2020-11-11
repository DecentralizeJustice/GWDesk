<template>
  <v-col cols='12'>
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
      Getting Wallet Info...
      </v-alert>
    </v-row>
  </v-col>
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
