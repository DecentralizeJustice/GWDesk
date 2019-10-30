<template>
  <v-container class="">
      <v-row
        v-for="n in 1"
        :key="n"
        no-gutters
      >
        <v-col>
          <v-hover v-slot:default="{ hover }" v-for="item in transactions" :key="item.txid">
          <v-card
            :class="{ 'on-hover': hover }"
            class='light-blue darken-4'
            link
            :elevation="hover ? 12 : 2"
          >
            <v-card-text class="mt-4 subtitle-1 white--text">
              <v-icon
              large v-bind:color="getColor(item.category)">
              {{getArrow (item.category)}}</v-icon>
              {{getType(item.category)}}
              {{item.amount}} BTC
            </v-card-text>
          </v-card>
        </v-hover>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { getWalletTransactions } from '@/assets/util/nodeUtils/nodeUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
export default {
  data: () => ({
    receiveAddress: '',
    transactions: []
  }),
  methods: {
    getType (type) {
      if (type === 'send') {
        return 'Send'
      } else {
        return 'Recieve'
      }
    },
    getArrow (type) {
      if (type === 'send') {
        return 'mdi-arrow-top-left-thick'
      } else {
        return 'mdi-arrow-bottom-right-thick'
      }
    },
    getColor (type) {
      if (type === 'send') {
        return 'red darken-2'
      } else {
        return 'green darken-2'
      }
    }
  },
  async mounted () {
    const results = await getWalletTransactions(account, walletName)
    this.transactions = results
    // console.log(results)
  }
}
</script>
