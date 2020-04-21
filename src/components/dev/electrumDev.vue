<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-title class="headline justify-center">
              Electrum Dev
            </v-card-title>
            <v-btn
              color="orange"
              text
              v-on:click="get()"
            >
              Test Request
            </v-btn>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
const axios = require('axios')
export default {
  components: {
  },
  data: () => ({
    dialog: false,
    hardwareWallets: [],
    channel: {}
  }),
  methods: {
    get: async function () {
      try {
        const data = {
          method: 'getbalance',
          params: [],
          id: '567tyuf'
        }
        const yes = await axios.post('http://127.0.0.1:7777', data, {
          auth: {
            username: 'user',
            password: '1'
          }
        }
        )
        console.log(yes.data.error.message)
      } catch (error) {
        console.log('ran')
        console.error(error)
      }
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
