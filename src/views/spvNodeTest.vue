<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs8>
        <v-card >
          <v-card-actions class="text-xs-center">
            <v-flex class="text-xs-center">
              <v-btn text color="primary" v-on:click="startNode()">Start Node</v-btn>
              <v-btn text color="primary" v-on:click="checkServer()">Check Sever</v-btn>
              <v-btn text color="primary" v-on:click="wallet()">Wallet</v-btn>
              <v-btn text color="primary" v-on:click="add()">Add Address</v-btn>
            </v-flex>
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
import { asyncCall, createWallet, addAddressWallet } from '@/assets/util/nodeUtils/nodeUtil.js'
import path from 'path'
import { fork } from 'child_process'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    startNode () {
      const remote = require('electron').remote
      const app = remote.app
      console.log(app.getPath('userData'))
      const location = app.getPath('userData') + '/here'
      console.log(location)
      const args = [location]
      // eslint-disable-next-line
      const process = fork(path.join(__static, "spvNodeStart.js"), args)
    },
    async checkServer () {
      const result = await asyncCall()
      console.log(result)
    },
    async wallet () {
      const result = await createWallet('g')
      console.log(result)
    },
    async add () {
      const results = await addAddressWallet()
      console.log(results)
    }
  }
}
</script>
