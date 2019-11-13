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
  },
  async created () {
    const results = await getWalletTransactions(account, walletName)
    const sortByTime = R.sortBy(R.prop('blocktime'))
    const oldestLast = R.reverse(sortByTime(results))

    for (let i = 0; i < oldestLast.length; i++) {
      const txid = oldestLast[i].txid
      const transInfo = await getTxByHash(txid, 'musig')
      oldestLast[i].bitcoinjsInfo = decodeRawTransactionBitcoinJS(transInfo.tx)
      if (oldestLast[i].category === 'send') {
        const ins = oldestLast[i].bitcoinjsInfo.ins
        for (let j = 0; j < ins.length; j++) {
          const address = transInfo.inputs[j].address
          const value = transInfo.inputs[j].value
          oldestLast[i].bitcoinjsInfo.ins[j].address = address
          oldestLast[i].bitcoinjsInfo.ins[j].value = value
        }
      } else {
        const ins = oldestLast[i].bitcoinjsInfo.ins
        for (let j = 0; j < ins.length; j++) {
          let address = transInfo.inputs[j].address
          if (address === null) {
            address = 'Address Info Unavailabe'
          }
          oldestLast[i].bitcoinjsInfo.ins[j].address = address
        }
      }
      const outs = oldestLast[i].bitcoinjsInfo.outs
      for (let j = 0; j < outs.length; j++) {
        const address = await addressFromScriptPub(outs[j].script)
        oldestLast[i].bitcoinjsInfo.outs[j].address = address
      }
    }
    this.transactions = oldestLast
  }
}
</script>
<style scoped>

</style>
