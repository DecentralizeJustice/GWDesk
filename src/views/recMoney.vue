<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-title primary-title class="justify-center">
              <div>
                <h3>Receive Bitcoin</h3>
              </div>
            </v-card-title>
            <v-card-text class="text-center">
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
              v-if="transactions.length!==0"
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
import { getWalletTransactions } from '@/assets/util/nodeUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { vpubObject, m } from '@/assets/constants/userConstantFiles.js'
import { getReceiveAddress, getReceivedCoins, getRecTrans } from '@/assets/util/addressUtil.js'
import mainCard from '@/components/recMoney/mainCard.vue'
const R = require('ramda')
export default {
  components: {
    mainCard
  },
  data: () => ({
    receiveAddress: '',
    balance: '0',
    transactions: []
  }),
  methods: {
  },
  async mounted () {
    const vpubArray = R.values(vpubObject)
    const transactions = await getWalletTransactions(account, walletName)
    const address = await getReceiveAddress(0, transactions, vpubArray, m)
    const balance = await getReceivedCoins(address, transactions)
    const recToAddress = await getRecTrans(address, transactions)
    this.receiveAddress = address
    this.balance = balance.shiftedBy(-8).toString()
    this.transactions = recToAddress
  }
}
</script>
