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
            {{confirmedTransInfo}} BTC
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import { getUTXO, getNodeHeight } from '@/assets/util/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
const R = require('ramda')
const BigNumber = require('bignumber.js')
export default {
  components: {
  },
  data: () => ({
    transactions: [],
    currentBlock: 0
  }),
  methods: {
    async setup () {
      const results = await getUTXO(walletName)
      const sortByTime = R.sortBy(R.prop('blocktime'))
      const sortedTransactions = sortByTime(results)
      const currentBlock = await getNodeHeight()
      this.currentBlock = currentBlock
      this.transactions = sortedTransactions
    }
  },
  computed: {
    confirmedTransInfo: function () {
      let inputSum = BigNumber(0)
      const isConfirming = n => (this.currentBlock - n.height) > 2
      const trans = R.reverse(R.filter(isConfirming, this.transactions))
      if (trans.length !== 0) {
        for (const element of trans) {
          const value = BigNumber(element.value)
          inputSum = BigNumber.sum(inputSum, value)
        }
        return inputSum.shiftedBy(-8).toString()
      }
      return 0
    }
  },
  async mounted () {
    await this.setup()
  }
}
</script>
<style scoped>

</style>
