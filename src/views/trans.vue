<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs10>
          <v-card >
            <v-card-title class="headline justify-center">
              Transactions
            </v-card-title>
            <v-divider></v-divider>

            <mainCard v-bind:transactions="transactions"
              style="max-height: 75vh;overflow: scroll;"/>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import mainCard from '@/components/transactions/mainCard.vue'
import { getWalletTransactions, getTxByHash } from '@/assets/util/nodeUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
const R = require('ramda')
export default {
  components: {
    mainCard
  },
  data: () => ({
    transactions: []
  }),
  methods: {
  },
  async created () {
    const results = await getWalletTransactions(account, walletName)
    const sortByTime = R.sortBy(R.prop('blocktime'))
    const oldestLast = R.reverse(sortByTime(results))
    for (var i = 0; i < oldestLast.length; i++) {
      const txid = oldestLast[i].txid
      const transInfo = await getTxByHash(txid, 'musig')
      oldestLast[i].transactionInformation = transInfo
    }
    this.transactions = oldestLast
  }
}
</script>
<style scoped>

</style>
