<template>

      <v-flex xs12>
        <v-card-text>
          <h1 class="display-1">Transaction Overview</h1>
          <!-- <v-row
            no-gutters
            class="mb-5"
            v-for="(item,index) in addressArray" :key="index"
          >
            <v-col cols="12" class="mx-auto">
              <v-row align-content='center'>
                <v-col
                  cols="9"
                  align-self='center'
                >
                <v-hover v-slot:default="{ hover }">
                <v-card
                  class='light-blue darken-4'
                  :elevation="hover ? 12 : 2"
                >
                  <v-card-text class="subtitle-1 white--text">
                    {{index+1}}. {{item}}
                  </v-card-text>
                </v-card>
                </v-hover>
                </v-col>
                <v-col cols="3" align-self='center'>
                  <v-card
                    class='indigo darken-1'
                  >
                  <v-card-text class="subtitle-1 white--text">
                    Send Amount:
                    <br> {{getAmount(index)}} BTC
                  </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row> -->
        </v-card-text>
        </v-flex>
</template>

<script>
export default {
  props: ['transaction'],
  data: () => ({
  }),
  computed: {
    // addressArray: function () {
    //   return this.transaction.addressArray
    // },
    // addressAmountArray: function () {
    //   return this.transaction.addressArrayAmount
    // }
  },
  methods: {
  },
  created () {
  }
}
</script>
