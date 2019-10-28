<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs10>
          <v-card >
            <v-card-title class="headline justify-center">
              Transactions
            </v-card-title>
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
import { nodeStartup } from '@/assets/task/nodeSetup.js'
import { vpubObject } from '@/assets/constants/userConstantFiles.js'
const R = require('ramda')
export default {
  components: {
    mainCard
  },
  data: () => ({
    receiveAddress: ''
  }),
  methods: {
  },
  async mounted () {
    const vpubArray = R.values(vpubObject)
    await nodeStartup(vpubArray)
  }
}
</script>
