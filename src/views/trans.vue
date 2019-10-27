<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs10>
          <v-card >
            <v-card-title class="headline justify-center">
              Transactions
            </v-card-title>
            <v-divider></v-divider>
            <div class="my-2">
  <v-btn v-on:click="startNode ()">Start Node</v-btn>
  <v-btn v-on:click="checkNodeAlive ()">Check Node Alive</v-btn>
  <v-btn v-on:click="killNode ()">killNode</v-btn>
</div>
            <!-- <mainCard class="mb-6 mt-6"/> -->
            <!-- <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import mainCard from '@/components/transactions/mainCard.vue'
import { firstNodeStartup } from '@/assets/task/nodeSetup.js'
import { checkNodeAlive, stopNode } from '@/assets/util/nodeUtils/nodeUtil.js'
export default {
  components: {
    mainCard
  },
  data: () => ({
    receiveAddress: ''
  }),
  methods: {
    async startNode () {
      try {
        const results = await firstNodeStartup()
        console.log(results)
      } catch (e) {
        console.log(e)
      }
    },
    async checkNodeAlive () {
      const results = await checkNodeAlive()
      console.log(results)
    },
    async killNode () {
      const results = await stopNode()
      console.log(results)
    }
  },
  async mounted () {
    // const results = await firstNodeStartup() // I'm text inside the component.
    // console.log(results)
  }
}
</script>
