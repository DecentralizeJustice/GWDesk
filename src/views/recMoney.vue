<template>
  <v-layout align-center justify-center row fill-height>

    <v-flex xs8>
      <v-card >
        <v-card-title primary-title class="justify-center">
          <div>
            <h3>Receive Bitcoin</h3>
          </div>
        </v-card-title>
        <v-progress-circular
        indeterminate
        class="mt-5 mb-5"
        color="primary"
        v-if='loading'
        :size="150"
        style="left: 50%;transform: translate(-50%, 0%);"
        />
        <v-card-text class="text-center" v-if='!loading'>
          <div class="text--primary subtitle-1">
            Address: <br>
            {{receiveAddress}}<br><br>
            Current Balance:<br>
            {{balance}}
          </div>
          <div class="text--primary title mt-1"
            v-if="transactions.length===0">
            No Transactions
          </div>
        </v-card-text>

        <mainCard
          v-if="transactions.length!==0 && !loading"
          v-bind:transactions="transactions"
          style=" max-height: 35vh;overflow: scroll;"
          />

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
import { getWalletTransactions, getUTXO } from '@/assets/util/nodeUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { vpubObject, m } from '@/assets/constants/userConstantFiles.js'
import { getReceiveAddress } from '@/assets/util/addressUtil.js'
import mainCard from '@/components/recMoney/mainCard.vue'
const BigNumber = require('bignumber.js')
const R = require('ramda')
export default {
  components: {
    mainCard
  },
  data: () => ({
    receiveAddress: '',
    balance: '0',
    transactions: [],
    loading: true
  }),
  methods: {
    setup: async function () {
      const vpubArray = R.values(vpubObject)
      const transactions = await getWalletTransactions(account, walletName)
      const address = await getReceiveAddress(0, transactions, vpubArray, m)
      const walletBalance = await getUTXO(walletName)
      const includesRec = trans => trans.address === address && trans.category === 'receive'
      const involvesAddress = trans => trans.address === address
      const recToAddress = R.filter(involvesAddress, walletBalance)
      const getValue = x => x.value
      const valueArray = R.map(getValue, recToAddress)
      this.receiveAddress = address
      this.balance = BigNumber.sum.apply(null, valueArray).shiftedBy(-8).toFormat()
      this.transactions = R.filter(includesRec, transactions) // recToAddress
      this.loading = false
    }
  },
  async created () {
    await this.setup()
  }
}
</script>
