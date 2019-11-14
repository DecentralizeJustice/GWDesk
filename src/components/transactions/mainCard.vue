<template>
  <v-container class="">
    <v-card
      class='light-blue darken-4'
      :elevation="0"
      v-for="(item, index) in transactions" :key="index"
    >
      <v-card-text class="mt-4 subtitle-1 white--text">
        <v-icon
        large v-bind:color="getColor(item.category)">
        {{getArrow (item.category)}}</v-icon>
        {{getType(item.category)}}
        {{item.amount}} BTC <v-divider/>
        {{getDate (item.blocktime)}}
      </v-card-text>

        <v-simple-table >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Input Addresses</th>
                <th class="text-left" v-if="item.category==='send'">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stuff,index) in getInputInfo(item)" :key="index">
                <td>{{ stuff.address }}</td>
                <td v-if="item.category==='send'">{{ stuff.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-simple-table class="mt-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Outputs</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stuff,index) in getOutputInfo(item)" :key="index">
                <td>{{ stuff.address }}</td>
                <td>{{ stuff.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['transactions'],
  data: () => ({
    panel: []
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
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday']
      const monthNames = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ]

      let time = ''
      const utcSeconds = epoch
      const d = new Date(0)
      d.setUTCSeconds(utcSeconds)
      const amPm = d.getHours() >= 12 ? 'pm' : 'am'
      let hours = d.getHours() % 12
      hours = hours ? hours : 12 // eslint-disable-line
      let minutes = d.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      time += days[d.getDay()]
      time += ' ' + d.getDate()
      time += ' ' + monthNames[d.getMonth()]
      time += ' ' + hours + ':' + minutes + ' ' + amPm
      return time
    },
    getInputInfo (info) {
      const test = info.bitcoinjsInfo.ins
      return test
    },
    getOutputInfo (info) {
      const test = info.bitcoinjsInfo.outs
      return test
    }
  }
}
</script>
