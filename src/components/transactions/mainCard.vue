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
              {{item.amount}} BTC <v-divider/>
              {{getDate (item.blocktime)}}
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
    },
    getDate (epoch) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]

      let time = ''
      const utcSeconds = epoch
      const d = new Date(0)
      d.setUTCSeconds(utcSeconds)
      const ampm = d.getHours() >= 12 ? 'pm' : 'am'
      let hours = d.getHours() % 12
      hours = hours ? hours : 12 // eslint-disable-line
      let minutes = d.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      time += days[d.getDay()]
      time += ' ' + d.getDate()
      time += ' ' + monthNames[d.getMonth()]
      time += ' ' + hours + ':' + minutes + ' ' + ampm
      return time
    }
  },
  async mounted () {
  }
}
</script>
