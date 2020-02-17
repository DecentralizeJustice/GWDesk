<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters" style="" >
            <v-divider></v-divider>
            <v-tabs background-color="" v-bind:vertical="true"
            color="green">
              <v-tab>
                <v-icon left>mdi-timer-sand</v-icon>
                Pending
              </v-tab>
              <v-tab>
                <v-icon left>mdi-lock-clock</v-icon>
                Confirming
              </v-tab>
              <v-tab>
                <v-icon left>mdi-lock</v-icon>
                Confirmed
              </v-tab>
              <v-tab-item>
                <transCard
                  v-bind:info="pendingTransInfo"
                  v-if='!loading'
                  style="max-height: 50vh;overflow: scroll;"
                  />
              </v-tab-item>
              <v-tab-item>
                <transCard class=""
                  v-bind:info="confirmingTransInfo" v-if='!loading'
                  style="max-height: 50vh;overflow: scroll;"
                  />
              </v-tab-item>
              <v-tab-item>
                <transCard class=""
                  v-bind:info="confirmedTransInfo" v-if='!loading'
                  style="max-height: 50vh;overflow: scroll;"
                  />
              </v-tab-item>
           </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import transCard from '@/components/btcWallet/balance/cardComponent.vue'
import { getTxByHash, getUTXO, getNodeHeight } from '@/assets/util/nodeUtil.js'
import { decodeRawTransactionBitcoinJS } from '@/assets/util/transactionUtil/transactionUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
import { addressFromScriptPub } from '@/assets/util/addressUtil.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('unlockedLessons')
const R = require('ramda')
export default {
  components: {
    transCard
  },
  data: () => ({
    transactions: [],
    loading: true
  }),
  methods: {
    async getInputandOutputInfo (transactions) {
      for (let i = 0; i < transactions.length; i++) {
        const txid = transactions[i].hash
        const transInfo = await getTxByHash(txid, 'musig')
        transactions[i].bitcoinjsInfo = decodeRawTransactionBitcoinJS(transInfo.tx)
        transactions[i].transInfo = transInfo
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
    },
    async setup () {
      const results = await getUTXO(walletName)
      const sortByTime = R.sortBy(R.prop('blocktime'))
      const sortedTransactions = sortByTime(results)
      const currentBlock = await getNodeHeight()
      this.currentBlock = currentBlock
      const updatedTransactions = await this.getInputandOutputInfo(sortedTransactions)
      this.transactions = updatedTransactions
      this.loading = false
    }
  },
  computed: {
    pendingTransInfo: function () {
      const isPending = n => n.height === -1
      const trans = R.filter(isPending, this.transactions)
      return { trans: trans, type: 'pending' }
    },
    confirmingTransInfo: function () {
      const isConfirming = n => n.height !== -1 && (this.currentBlock - n.height) <= 1
      const trans = R.reverse(R.filter(isConfirming, this.transactions))
      return { trans: trans, type: 'confirming' }
    },
    confirmedTransInfo: function () {
      const isConfirming = n => (this.currentBlock - n.height) > 1
      const trans = R.reverse(R.filter(isConfirming, this.transactions))
      return { trans: trans, type: 'confirmed' }
    },
    ...mapGetters({
      introDone: 'introDone'
    })
  },
  async created () {
    await this.setup()
  }
}
</script>
<style scoped>

</style>
