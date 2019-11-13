<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
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
import { decodeRawTransactionBitcoinJS } from '@/assets/util/transactionUtil/transactionUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { addressFromScriptPub } from '@/assets/util/addressUtil.js'
const R = require('ramda')
export default {
  components: {
    mainCard
  },
  data: () => ({
    transactions: []
  }),
  methods: {
    async getInputandOutputInfo (transactions) {
      for (let i = 0; i < transactions.length; i++) {
        const txid = transactions[i].txid
        const transInfo = await getTxByHash(txid, 'musig')
        transactions[i].bitcoinjsInfo = decodeRawTransactionBitcoinJS(transInfo.tx)
        if (transactions[i].category === 'send') {
          const ins = transactions[i].bitcoinjsInfo.ins
          for (let j = 0; j < ins.length; j++) {
            const address = transInfo.inputs[j].address
            const value = transInfo.inputs[j].value
            transactions[i].bitcoinjsInfo.ins[j].address = address
            transactions[i].bitcoinjsInfo.ins[j].value = value
          }
        } else {
          const ins = transactions[i].bitcoinjsInfo.ins
          for (let j = 0; j < ins.length; j++) {
            let address = transInfo.inputs[j].address
            if (address === null) {
              address = 'Address Info Unavailable'
            }
            transactions[i].bitcoinjsInfo.ins[j].address = address
          }
        }
        const outs = transactions[i].bitcoinjsInfo.outs
        for (let k = 0; k < outs.length; k++) {
          const address = await addressFromScriptPub(outs[k].script)
          transactions[i].bitcoinjsInfo.outs[k].address = address
        }
      }
      return transactions
    }
  },
  async created () {
    const results = await getWalletTransactions(account, walletName)
    const sortByTime = R.sortBy(R.prop('blocktime'))
    const sortedTransactions = R.reverse(sortByTime(results))
    const updatedTransactions = await this.getInputandOutputInfo(sortedTransactions)
    this.transactions = updatedTransactions
  }
}
</script>
<style scoped>

</style>
