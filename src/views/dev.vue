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
        </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { recoverFromPubs } from '@/assets/task/recoverFromPubs.js'
import { getPendingTransactions, resetChainTo, getNodeInfo, createWallet, startNode } from '@/assets/util/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
import { decodeRawTransactionBitcoinJS } from '@/assets/util/transactionUtil/transactionUtil.js'
import { createNamespacedHelpers } from 'vuex'
import { uploadTXT } from '@/assets/util/electronUtil.js'
import { test } from '@/assets/util/coldCardUtil.js'
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
      'updateWalletToken'
    ]),
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
      const arraySplitText = await uploadTXT()
      console.log(arraySplitText[5])
    }
  },
  async mounted () {
  }
}
</script>
