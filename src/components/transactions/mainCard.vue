<template>
  <v-container class="">
      <v-row
        v-for="item in transactions" :key="item.txid"
        no-gutters
      >
        <v-col>
          <v-hover v-slot:default="{ hover }" >
          <v-card
            class='light-blue darken-4'
            link
            :elevation="hover ? 12 : 2"
          >
            <v-card-text class="mt-4 subtitle-1 white--text">
              <v-icon
              large v-bind:color="getColor(item.category)">
              {{getArrow (item.category)}}</v-icon>
              {{getType(item.category)}}
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
    getType (type) {
      if (type === 'send') {
        return 'Sent'
      } else {
        return 'Recieved'
      }
    },
    getArrow (type) {
      if (type === 'send') {
        return 'mdi-arrow-top-left-thick'
      } else {
        return 'mdi-arrow-bottom-right-thick'
      }
    },
    getColor (type) {
      if (type === 'send') {
        return 'red darken-2'
      } else {
        return 'green darken-2'
      }
    }
  },
  async mounted () {
  }
}
</script>
