<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11 v-if='!walletReady'>
      <v-card class="text-xs-center no-gutters" style="" >
        <v-card-title class="headline justify-center">
          Wallet Syncing...
        </v-card-title>
            <v-divider/>
            <div class="text-center mb-5 mt-5">
              <v-progress-circular
                :size="100"
                :width="7"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </div>
          <v-divider/>
          <v-card-actions>
          <v-btn
            color="orange"
            text
          >
            <v-icon>mdi-help</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            text
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs11 v-if='!walletError && walletReady'>
      <v-card class="text-xs-center no-gutters" style="" >
        <v-card-title class="headline justify-center">
          Bitcoin Single Sig
        </v-card-title>
            <v-divider></v-divider>
            <v-tabs background-color="">
              <v-tab>
                <v-icon left>mdi-lock-clock</v-icon>
                Balance
              </v-tab>
              <v-tab>
                <v-icon left>mdi-email-receive</v-icon>
                Receive Money
              </v-tab>
              <v-tab>
                <v-icon left>mdi-send-check</v-icon>
                Send Money
              </v-tab>
              <v-tab>
                <v-icon left>mdi-history</v-icon>
                Transactions
              </v-tab>
              <v-tab-item>
                <balance/>
              </v-tab-item>
              <v-tab-item>
                <recieveMoney/>
              </v-tab-item>
              <v-tab-item>
                <sendMoney/>
              </v-tab-item>
              <v-tab-item>
                <transactions/>
              </v-tab-item>
           </v-tabs>
          <v-divider/>
          <v-card-actions>
          <v-btn
            color="orange"
            text
          >
            <v-icon>mdi-help</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            text
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  listWalletsThatExist, checkIfNodeProcessRunning, startDeamon,
  listLoadedWallets, loadWallet
} from '@/assets/util/btc/electrum/general.js'
import { mapState, mapGetters } from 'vuex'
import balance from '@/components/btcWallet/singleSig/balance/balance.vue'
import sendMoney from '@/components/btcWallet/singleSig/sendMoney/main.vue'
import recieveMoney from '@/components/btcWallet/singleSig/recMoney/mainCard.vue'
import transactions from '@/components/btcWallet/singleSig/transactions/mainCard.vue'
export default {
  components: {
    balance,
    sendMoney,
    recieveMoney,
    transactions
  },
  data: () => ({
    walletReady: false,
    retries: 20,
    walletError: false
  }),
  computed: {
    ...mapState('bitcoinInfo', [
      'btcSingleSigTestnet'
    ]),
    network: function () {
      return this.btcSingleSigTestnet.network
    },
    ...mapGetters('hardwareInfo', [
      'singleSigElectrumName',
      'singleSigHardwareWalletInfo'
    ])
  },
  methods: {
    start: async function () {
      if (this.retries < 0) {
        throw Error('Too many attempts to bring up wallet')
      }
      await this.correctWalletExist()
      await this.electrumRunning()
      await this.correctWalletLoaded()
      return true
    },
    electrumRunning: async function () {
      const nodeStatus = await checkIfNodeProcessRunning()
      if (!nodeStatus) {
        this.retries = this.retries - 1
        await startDeamon(this.network)
        this.start()
      }
      return true
    },
    correctWalletExist: async function () {
      const wallets = await listWalletsThatExist(this.network)
      if (!wallets.includes(this.singleSigElectrumName)) {
        this.walletError = true
        throw Error('Correct Wallet Does not Exist')
      }
      return true
    },
    correctWalletLoaded: async function () {
      const loadedWallets = await listLoadedWallets(this.btcSingleSigTestnet.rpcPort,
        this.btcSingleSigTestnet.rpcUser, this.btcSingleSigTestnet.rpcPassword)
      if (!loadedWallets.data.result.includes(this.singleSigElectrumName)) {
        this.retries = this.retries - 1
        await loadWallet(this.singleSigElectrumName, this.btcSingleSigTestnet.rpcPort,
          this.btcSingleSigTestnet.rpcUser, this.btcSingleSigTestnet.rpcPassword,
          this.network)
        this.start()
      }
      return true
    }
  },
  async mounted () {
    try {
      await this.start()
      this.walletReady = true
    } catch (e) {
      this.walletError = true
      console.log('Wallet Bring Up Error')
    }
  }
}
</script>
<style scoped>

</style>
