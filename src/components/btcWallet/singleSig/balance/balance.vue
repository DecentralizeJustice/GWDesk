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
          <div class="display-1 mt-5" v-if='unconfirmed != undefined'>
            {{unconfirmed}} Unconfirmed BTC
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import { getBalance } from '@/assets/util/btc/electrum/general.js'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
  },
  data: () => ({
    balance: 0,
    unconfirmed: 0
  }),
  methods: {
    async setup () {
      const walletInfo = this.btcSingleSigTestnet
      const balanceInfo = await
      getBalance(this.singleSigElectrumName, walletInfo.rpcPort, walletInfo.rpcUser,
        walletInfo.rpcPassword, walletInfo.network)
      this.balance = balanceInfo.data.result.confirmed
      this.unconfirmed = balanceInfo.data.result.unconfirmed
    }
  },
  computed: {
    ...mapState('bitcoinInfo', [
      'btcSingleSigTestnet'
    ]),
    ...mapGetters('hardwareInfo', [
      'singleSigElectrumName'
    ])
  },
  async mounted () {
    await this.setup()
  }
}
</script>
<style scoped>

</style>
