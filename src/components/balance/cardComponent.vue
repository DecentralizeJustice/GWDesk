<template>
  <div class="grey darken-4 pa-2">
    <v-row justify="center" align='center'>
      <v-col cols='11'>
      <v-card :elevation="0" color='grey darken-1'
      v-if='info.trans.length === 0'
      >
        <v-card-text class=" subtitle-1 white--text">
          <v-icon
          color="black">
          mdi-minus-circle</v-icon>
          None
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols='11' v-for="(item, index) in info.trans" :key="index">
    <v-card
      class='mt-3'
      :elevation="0"
      :color='getpanelolor(item.transInfo.confirmations)'
    >

      <v-card-text class="subtitle-1 white--text">
        <v-icon
        color="green darken-2">
        mdi-arrow-bottom-right-thick</v-icon>
        Received
        {{getBTC(item.value)}} BTC
        <br>
        {{getDate(item.transInfo.time)}}

        <v-row
            align="center"
            justify="center"
          >
          <v-btn class="mt-2 ml-2" color="" @click="setpanelState(index)">
            {{getButtonText(index)}}
          </v-btn>
          </v-row>
      </v-card-text>

      <div v-if="getpanelState(index)" class="pb-3">
        <v-simple-table light class="ma-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Input Addresses</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stuff,index) in getInputInfo(item)" :key="index">
                <td>{{ stuff.address }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-simple-table class="ma-3" light>
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
      </div>
    </v-card>
  </v-col>
  </v-row>
</div>
</template>

<script>
const R = require('ramda')
const BigNumber = require('bignumber.js')
export default {
  props: ['info'],
  data: () => ({
    panel: []
  }),
  methods: {
    getBTC (satoshi) {
      const satoshiBigNum = new BigNumber(satoshi)
      return satoshiBigNum.shiftedBy(-8).toFormat()
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
    },
    setpanelState (index) {
      const copy = R.clone(this.panel)
      copy[index] = !copy[index]
      this.panel = copy
    },
    getButtonText (index) {
      if (this.panel[index]) {
        return 'Close'
      }
      return 'More Info'
    },
    getpanelState (index) {
      const state = this.panel[index]
      return state
    },
    getpanelolor (confs) {
      switch (confs) {
        case -1:
          return 'blue lighten-1'
        case 0:
          return 'blue'
        case 1:
          return 'blue darken-2'
        case 2:
          return 'blue darken-3'
      }
      return 'blue darken-4'
    }
  },
  created: function () {
    for (var i = 0; i < this.info.trans.length; i++) {
      this.panel.push(false)
    }
  }
}
</script>
