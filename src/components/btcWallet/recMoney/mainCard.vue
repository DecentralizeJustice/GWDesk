<template>
  <v-container>
      <div class=" title text-center">
        Recieve Address:
      </div>
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <v-col align="center"
            justify="center" xs12>
          <div>
            {{address}}
          </div>

          <div class="">
            <v-btn large color="primary" v-on:click='copyToClipboard'
            >
              Copy
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { getWalletTransactions } from '@/assets/util/nodeUtil.js'
import { getReceiveAddress } from '@/assets/util/addressUtil.js'
import { account, walletName, m } from '@/assets/constants/genConstants.js'
import { createNamespacedHelpers } from 'vuex'
const userConstants = createNamespacedHelpers('userConstants')
const { clipboard } = require('electron')
export default {
  props: ['transactions'],
  data: () => ({
    address: ''
  }),
  methods: {
    copyToClipboard () {
      const text = this.address
      clipboard.writeText(text)
    }
  },
  computed: {
    ...userConstants.mapGetters([
      'walletVpubs'
    ])
  },
  async mounted () {
    const transactions = await getWalletTransactions(account, walletName)
    const address = await getReceiveAddress(0, transactions, this.walletVpubs, m)
    this.address = address
  }
}
</script>
