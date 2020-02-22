<template>
  <v-container fluid fill-height>
    <v-row no-gutters>
      <v-col
        cols="12">
      <v-card xs11 wrap
      align="center"
      justify="center">
        <v-card-text>
          <h2>Dev Portal</h2>
        </v-card-text>
        <v-divider></v-divider>
        <div class="ma-4 pb-4">
          <v-btn
            color="orange"
            text
            v-on:click="startNode()"
          >
            Start Node
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="stopNode()"
          >
            Stop Node
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="testColdCard()"
          >
            Test Coldcard
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="updateWalletInfo()"
          >
            Update Wallet Info
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="recover()"
            :disabled="disable"
          >
            Recover
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="rescan()"
          >
            Rescan
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="info()"
          >
            Get Info
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="start()"
          >
            Get Pending
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="createWallet()"
          >
            Create Wallet
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="initWallet()"
          >
            Init Wallet
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="getPubkey()"
          >
            Test Pubkey
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="pubToXpub()"
          >
            Convert Pub To Xpub
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="getnextXpub()"
          >
            Get Next Xpub
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="testWalletAddressList()"
          >
            Test Import
          </v-btn>
          <v-btn
            color="orange"
            text
            v-on:click="createRandomXPub()"
          >
            Create Random Xpub
          </v-btn>
        </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { pubToVpub, createRandomXPub } from '@/assets/util/pubUtil.js'
import { testnet } from '@/assets/constants/networkConstants.js'
import { getPubkey, getNextXpub } from '@/assets/util/keyUtil.js'
import { recoverFromPubs } from '@/assets/task/recoverFromPubs.js'
import { initWallet } from '@/assets/task/initWallet.js'
import {
  getPendingTransactions, resetChainTo, getNodeInfo, createWallet,
  listAccountAddresses, startNode, stopNode, importAddress
} from '@/assets/util/nodeUtil.js'
import { walletName, changeAccount } from '@/assets/constants/genConstants.js'
import { decodeRawTransactionBitcoinJS } from '@/assets/util/transactionUtil/transactionUtil.js'
import { createNamespacedHelpers } from 'vuex'
import { uploadTXT } from '@/assets/util/electronUtil.js'
import { test, recoverColdCardsInfo } from '@/assets/util/coldCardUtil.js'
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('userConstants')
export default {
  components: {
  },
  data: () => ({
    disable: false
  }),
  computed: {
    ...mapGetters([
      'walletVpubs'
    ]),
    ...mapState([
      'm'
    ])
  },
  methods: {
    ...mapActions([
      'updateWalletToken',
      'updateWalletObject'
    ]),
    async testWalletAddressList () {
      const tes = await listAccountAddresses(changeAccount, walletName)
      console.log(tes)
      await importAddress(changeAccount, 'tb1quy554arqg4z3e92d5jqatuuun6fqnv8u8mz45mv9hdwl0eah490sl23a5j', walletName)
      const after = await listAccountAddresses(changeAccount, walletName)
      console.log(tes, after)
    },
    async createRandomXPub () {
      const tes = await createRandomXPub(testnet)
      console.log(tes)
    },
    async pubToXpub () {
      const tes = await pubToVpub('xpub6GWRq8UfAooYLs43fdcjcxDHwSMCPWk9SFk4nsKDs4UQHS4MYm9MsVjqXowkVd4naDYXL4XcxWx2e4Q61LgDMnZyX6pH8ZZG5jr5819KY7q')
      console.log(tes)
    },
    async getnextXpub () {
      const tes = await getNextXpub(0, 'tpubDEDCwTRhZt6JapCDEaGLF5bKV5f7y7jjs1NJX499JYrBLPp9ehvnXwMJAjHcBgudjhgSAy4y9kCBXgqRmv8bJhCARAykxVGt5U85gzsefaZ', testnet)
      console.log(tes)
    },
    async getPubkey () {
      const tes = await getPubkey(0, 'xpub6GWRq8UfAooYLs43fdcjcxDHwSMCPWk9SFk4nsKDs4UQHS4MYm9MsVjqXowkVd4naDYXL4XcxWx2e4Q61LgDMnZyX6pH8ZZG5jr5819KY7q', testnet)
      console.log(tes.toString('hex'))
    },
    async recover () {
      this.disable = true
      await recoverFromPubs(this.walletVpubs, this.m)
      this.disable = false
    },
    async start () {
      const rest = await getPendingTransactions('musig')
      const tes = await decodeRawTransactionBitcoinJS(rest[0].tx)
      console.log(tes)
    },
    async testColdCard () {
      const results = await test()
      console.log(results)
    },
    async startNode () {
      await startNode()
      console.log('started')
    },
    async createWallet () {
      const results = await createWallet(walletName)
      await this.updateWalletToken(results.token)
    },
    async rescan () {
      console.log('ran')
      const results = await resetChainTo(1583007)
      console.log(results)
    },
    async info () {
      const results = await getNodeInfo()
      console.log(results)
    },
    async updateWalletInfo () {
      const text = await uploadTXT()
      const walletObject = await recoverColdCardsInfo(text)
      this.updateWalletObject(walletObject)
    },
    async initWallet () {
      const results = await initWallet()
      console.log(results)
    },
    async stopNode () {
      await stopNode()
    }
  },
  async mounted () {
  }
}
</script>
