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
import { getUTXO, getNodeHeight } from '@/assets/util/nodeUtil.js'
import { walletName, minConfirmations } from '@/assets/constants/genConstants.js'
const R = require('ramda')
const BigNumber = require('bignumber.js')
export default {
  components: {
  },
  data: () => ({
    transactions: [],
    currentBlock: 0,
    balance: BigNumber(0)
  }),
  methods: {
    async getBalance () {
      let inputSum = BigNumber(0)
      const isConfirming = n =>
        (this.currentBlock - Math.abs(n.height)) >= (minConfirmations - 1)
      const trans = R.filter(isConfirming, this.transactions)
      if (trans.length !== 0) {
        for (const element of trans) {
          const value = BigNumber(element.value)
          inputSum = BigNumber.sum(inputSum, value)
        }
        return inputSum.shiftedBy(-8).toString()
      }
      return BigNumber(0).toString()
    },
    async setup () {
      const utxo = await getUTXO(walletName)
      const currentBlock = await getNodeHeight()
      this.currentBlock = currentBlock
      this.transactions = utxo
      this.balance = await this.getBalance()
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
