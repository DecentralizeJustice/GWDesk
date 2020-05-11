<template>
  <v-container class="" style="max-height: 70vh;overflow-y: auto;">
    <v-card
      class='mt-2'
      v-bind:color="getpanelolor(item.confirmations)"
      :elevation="0"
      v-for="(item, index) in transactions" :key="index"
    >

      <v-card-text class=" subtitle-1 white--text">
        <v-icon
        large v-bind:color="getColor(item.incoming)">
        {{getArrow (item.incoming)}}</v-icon>
        {{getType(item.incoming)}}
        {{Math.abs(item.bc_value)}} BTC
        <br>
        {{getDate (item.monotonic_timestamp)}}

        <v-row
            align="center"
            justify="center"
          >
          <v-btn class="mt-2 ml-2" color="" @click="setPanelState(index)">
            {{getButtonText(index)}}
          </v-btn>
          </v-row>
      </v-card-text>

      <div v-if="getPanelState(index)">
        <v-card-text class="subtitle-1">
          Confirmations: {{item.confirmations}}<br>
          Block Height: {{item.height}}<br>
          Transaction Id: {{item.txid}}
        </v-card-text>
        <!-- <v-simple-table light >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Sent From:</th>
                <th class="text-left" v-if="item.category==='send'">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stuff,index) in getInputInfo(item)" :key="index">
                <td>{{ stuff.address }}</td>
                <td v-if="item.category==='send'">{{ satToBTC(stuff.value) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-simple-table class="mt-3" light>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Sent To:</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stuff,index) in getOutputInfo(item)" :key="index">
                <td>{{ stuff.address }}</td>
                <td>{{ satToBTC(stuff.value) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table> -->
      </div>
    </v-card>
  </v-container>
</template>
<script>
import {
  getWalletHistory
} from '@/assets/util/btc/electrum/general.js'
import { createNamespacedHelpers } from 'vuex'
const R = require('ramda')
const { mapState } = createNamespacedHelpers('bitcoinInfo')
export default {
  data: () => ({
    panel: [],
    transactions: []
  }),
  methods: {
    async setup () {
      const walletInfo = this.singleSigInfo
      const result = await getWalletHistory(walletInfo.electrumWalletName, walletInfo.rpcport,
        walletInfo.rpcuser, walletInfo.rpcpassword, walletInfo.network)
      const sortByTimestamp = R.sortBy(R.prop('monotonic_timestamp'))
      this.transactions = R.reverse(sortByTimestamp(result.data.result.transactions))
    },
    getType (type) {
      if (type === false) {
        return 'Sent'
      } else {
        return 'Received'
      }
    },
    getArrow (type) {
      if (type === false) {
        return 'mdi-arrow-top-left-thick'
      } else {
        return 'mdi-arrow-bottom-right-thick'
      }
    },
    getpanelolor (confs) {
      switch (confs) {
        case 0:
          return 'blue'
        case 1:
          return 'blue darken-1'
        case 2:
          return 'blue darken-3'
      }
      return 'blue darken-4'
    },
    getColor (type) {
      if (type === false) {
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
    },
    setPanelState (index) {
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
    getPanelState (index) {
      const state = this.panel[index]
      if (state === undefined) {
        return false
      }
      return state
    }
  },
  computed: {
    ...mapState({
      singleSigInfo: state => state.btcSingleSig
    })
  },
  mounted: async function () {
    await this.setup()
  }
}
</script>
