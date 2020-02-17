<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters" style="" >
        <v-card-title class="headline justify-center">
          Bitcoin Multisig
        </v-card-title>
            <v-divider></v-divider>
            <v-tabs background-color="">
              <v-tab>
                <v-icon left>mdi-lock-clock</v-icon>
                Balance
              </v-tab>
              <v-tab>
                <v-icon left>mdi-lock</v-icon>
                Send Money
              </v-tab>
              <v-tab>
                <v-icon left>mdi-lock</v-icon>
                Recieve Money
              </v-tab>
              <v-tab>
                <v-icon left>mdi-timer-sand</v-icon>
                Transactions
              </v-tab>
              <v-tab>
                <v-icon left>mdi-lock</v-icon>
                Tools
              </v-tab>
              <v-tab-item>
                <balance/>
              </v-tab-item>
              <v-tab-item>
                no
              </v-tab-item>
              <v-tab-item>
                no
              </v-tab-item>
              <v-tab-item>
                maybe
              </v-tab-item>
              <v-tab-item>
                Tools
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
            @click='setup()'
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import balance from '@/components/btcWallet/balance/balance.vue'
export default {
  components: {
    balance
  },
  data: () => ({
    transactions: [],
    loading: true
  }),
  methods: {
    async getInputandOutputInfo (transactions) {
    },
    async setup () {
    }
  },
  computed: {

  },
  async created () {
    // await this.setup()
  }
}
</script>
<style scoped>

</style>
