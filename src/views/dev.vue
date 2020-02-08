<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card xs10 wrap>
            <v-card-text>
              <h2>Dev Portal</h2>
            </v-card-text>
            <v-card-actions>
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
            </v-card-actions>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import { recoverFromPubs } from '@/assets/task/recoverFromPubs.js'
import { getPendingTransactions, resetChainTo, getNodeInfo, createWallet, startNode } from '@/assets/util/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
import { decodeRawTransactionBitcoinJS } from '@/assets/util/transactionUtil/transactionUtil.js'
import { createNamespacedHelpers } from 'vuex'
import { uploadTXT } from '@/assets/util/electronUtil.js'
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('userConstants')
export default {
  components: {
  },
  data: () => ({
    disable: false,
    transactions: []
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
      console.log(arraySplitText)
    }
  },
  async mounted () {
  }
}
</script>
