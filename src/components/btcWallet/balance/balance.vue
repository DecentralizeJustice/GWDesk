<template>
  <v-container>
      <div class=" display-1 text-center">
        Balance:
      </div>
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <v-col align="center"
            justify="center" xs12>
          <div class="display-1 mt-5">
            {{balance}} BTC
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
// const R = require('ramda')
// const BigNumber = require('bignumber.js')
export default {
  components: {
  },
  data: () => ({
    transactions: [],
    currentBlock: 0,
    balance: 0 // BigNumber(0)
  }),
  methods: {
    async getBalance () {
    },
    async setup () {
    }
  },
  computed: {
  },
  async mounted () {
    await this.setup()
  }
}
</script>
<style scoped>

</style>
