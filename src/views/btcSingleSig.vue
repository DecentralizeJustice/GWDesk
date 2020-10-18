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
    <v-flex xs11 v-if='walletReady'>
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
import { mapActions, mapGetters } from 'vuex'
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
    walletReady: true
  }),
  computed: {
    ...mapGetters('hardwareInfo', [
      'singleSigElectrumName'
    ])
  },
  methods: {
    start: function () {
      this.correctWalletExist()
    },
    correctWalletExist: function () {
      console.log(this.singleSigElectrumName)
    },
    ...mapActions('hardwareInfo',
      ['updateHardwareWalletInfo']
    )
  },
  async mounted () {
    this.start()
  }
}
</script>
<style scoped>

</style>
