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
import { createNamespacedHelpers } from 'vuex'
import { getBalance } from '@/assets/util/btc/electrum/general.js'
const { mapState } = createNamespacedHelpers('bitcoinInfo')
export default {
  components: {
  },
  data: () => ({
    balance: 0
  }),
  methods: {
    async setup () {
      const walletInfo = this.singleSigInfo
      const balanceInfo = await
      getBalance(walletInfo.electrumWalletName, walletInfo.rpcport, walletInfo.rpcuser,
        walletInfo.rpcpassword, walletInfo.network)
      this.balance = balanceInfo.data.result.confirmed
    }
  },
  computed: {
    ...mapState({
      singleSigInfo: state => state.btcSingleSig
    })
  },
  async mounted () {
    await this.setup()
  }
}
</script>
<style scoped>

</style>
