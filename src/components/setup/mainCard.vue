<template>
  <v-container>
      <div class=" title text-center">
        Transactions:
      </div>
      <v-row
        v-for="n in 1"
        :key="n"
        no-gutters
      >
        <v-col>
          <v-hover v-slot:default="{ hover }" v-for="item in transactions" :key="item.txid">
          <v-card
            class='light-blue darken-4'
            link
            :elevation="hover ? 12 : 2"
          >
            <v-card-text class="mt-4 subtitle-1 white--text">
              <v-icon
              large color="green">
              mdi-arrow-bottom-right-thick</v-icon>
              Received
              {{item.amount}} BTC
            </v-card-text>
          </v-card>
        </v-hover>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  props: ['transactions'],
  data: () => ({
  }),
  methods: {
  },
  async mounted () {
  }
}
</script>
