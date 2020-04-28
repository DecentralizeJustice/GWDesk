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
// import store from '../../../store/index.js'
// import { createNamespacedHelpers } from 'vuex'
// const userConstants = createNamespacedHelpers('userConstants')
const { clipboard } = require('electron')
// const vpubs = store.getters['userConstants/walletVpubs']
export default {
  props: ['transactions'],
  data: () => ({
    address: ''
  }),
  methods: {
    copyToClipboard () {
      const text = this.address
      clipboard.writeText(text)
    },
    async getaddress () {
    //   const transactions = await getAccountTransactions(receiveAccount, walletName)
    //   const recAccounts = []
    //   for (var pub of vpubs) {
    //     recAccounts.push(await getNextXpub(0, pub, testnet))
    //   }
    //   const address = await getReceiveAddress(0, transactions, recAccounts, m, testnet)
    //   try {
    //     await importAddress(receiveAccount, address, walletName)
    //   } catch (e) {
    //     if (e.message !== 'Address already exists.') {
    //       throw (e)
    //     }
    //   }
    //   this.address = address
    }
  },
  computed: {
    // ...userConstants.mapGetters([
    //   'walletVpubs'
    // ])
  },
  async mounted () {
    await this.getaddress()
  }
}
</script>
