<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs10>
          <v-card >
            <v-card-title class="headline justify-center">
              Transactions
            </v-card-title>
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

            <mainCard class="mb-6 mt-6"/>
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
import mainCard from '@/components/transactions/mainCard.vue'
import { recoverFromPubs } from '@/assets/task/recoverFromPubs.js'
import { vpubObject } from '@/assets/constants/userConstantFiles.js'
import { startNode, createWallet } from '@/assets/util/nodeUtils/nodeUtil.js'
const R = require('ramda')
export default {
  components: {
    mainCard
  },
  data: () => ({
    receiveAddress: '',
    disable: false
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
      const results = await createWallet('musig')
      console.log(results)
    }
  },
  async mounted () {
  }
}
</script>
