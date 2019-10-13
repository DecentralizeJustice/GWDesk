<template>
  <v-container grid-list-md text-center fill-height text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-text>
              <h2>Start Wallet Setup</h2>
            </v-card-text>
            <v-card-actions class="text-xs-center">
              <v-flex class="text-xs-center">
                <v-btn text color="primary" v-on:click="hit()">Buy New Membership</v-btn>
                <v-btn text color="primary" v-on:click="state()">Recover Old Membership</v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dropdown_font: []
  }),
  methods: {
    state () {
      console.log(this.$store.state)
    },
    hit () {
      this.$store.commit('increment')
    }
  }
}
</script>
