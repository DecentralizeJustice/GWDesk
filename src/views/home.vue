<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card >
            <v-card-text>
              <h2>Home</h2>
            </v-card-text>
            <v-card-actions>
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
                v-on:click="start()"
              >
                Start Node
              </v-btn>
              <v-btn
                color="orange"
                text
                v-on:click="createWallet()"
              >
                Create Wallet
              </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import { recoverFromPubs } from '@/assets/task/recoverFromPubs.js'
import { vpubObject } from '@/assets/constants/userConstantFiles.js'
import { startNode, createWallet } from '@/assets/util/nodeUtils/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
const R = require('ramda')
export default {
  components: {
  },
  data: () => ({
    disable: false,
    transactions: []
  }),
  methods: {
    async recover () {
      this.disable = true
      const vpubArray = R.values(vpubObject)
      await recoverFromPubs(vpubArray)
      console.log('Done !!!')
      this.disable = false
    },
    async start () {
      await startNode()
      console.log('node started')
    },
    async createWallet () {
      const results = await createWallet(walletName)
      console.log(results)
    }
  },
  async mounted () {
  }
}
</script>
