<template>
  <div class="grey darken-4 pa-2">
    <v-row justify="center" align='center'>
      <!-- <v-col cols='11'>
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
    </v-col> -->
    <v-col cols='11' v-for="(item, index) in transactions" :key="index">
    <v-card
      class='mt-3'
      :elevation="0"
      :color='getpanelolor(item.confirmations)'
    >

      <v-card-text class="subtitle-1 white--text">
        <v-icon
        color="green darken-2">
        mdi-arrow-bottom-right-thick</v-icon>
        Received
        {{getBTC(item.amount)}} BTC
        <br>
        {{getDate(item.time)}}

        <v-row
            align="center"
            justify="center"
          >
          <v-btn class="mt-2 ml-2" color="" @click="setpanelState(index)">
            {{getButtonText(index)}}
          </v-btn>
          </v-row>
      </v-card-text>
      <v-card-text class="white--text" v-if="getpanelState(index)">
        Confirmations: {{item.confirmations}}<br>
        Block Height: {{item.blockheight}}<br>
        Transaction Id: {{item.blockhash}}
      </v-card-text>

      <!-- <div v-if="getpanelState(index)" class="pb-3">
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
      </div> -->
    </v-card>
  </v-col>
  </v-row>
</div>
</template>

<script>
import { addressFromScriptPub } from '@/assets/util/addressUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { getWalletTransactions, getTxByHash } from '@/assets/util/nodeUtil.js'
import { decodeRawTransactionBitcoinJS } from '@/assets/util/transactionUtil/transactionUtil.js'
const R = require('ramda')
const BigNumber = require('bignumber.js')
export default {
  data: () => ({
    panel: [],
    transactions: []
  }),
  methods: {
    processAmount (amount) {
      const proccessedAmount = new BigNumber(amount).absoluteValue()
      return proccessedAmount.toString()
    },
    satToBTC (amount) {
      const sat = new BigNumber(amount)
      const btc = sat.shiftedBy(-8)
      return btc.toString()
    },
    async getInputandOutputInfo (transactions) {
      for (let i = 0; i < transactions.length; i++) {
        const txid = transactions[i].txid
        const transInfo = await getTxByHash(txid, 'musig')
        transactions[i].bitcoinjsInfo = decodeRawTransactionBitcoinJS(transInfo.tx)
        if (transactions[i].category === 'send') {
          const ins = transactions[i].bitcoinjsInfo.ins
          for (let j = 0; j < ins.length; j++) {
            const address = transInfo.inputs[j].address
            const value = transInfo.inputs[j].value
            transactions[i].bitcoinjsInfo.ins[j].address = address
            transactions[i].bitcoinjsInfo.ins[j].value = value
          }
        } else {
          const ins = transactions[i].bitcoinjsInfo.ins
          for (let j = 0; j < ins.length; j++) {
            let address = transInfo.inputs[j].address
            if (address === null) {
              address = 'Address Info Unavailable'
            }
            transactions[i].bitcoinjsInfo.ins[j].address = address
          }
        }
        const outs = transactions[i].bitcoinjsInfo.outs
        for (let k = 0; k < outs.length; k++) {
          const address = await addressFromScriptPub(outs[k].script)
          transactions[i].bitcoinjsInfo.outs[k].address = address
        }
      }
      return transactions
    },
    // async setup () {
    //   const results = await getUTXO(walletName)
    //   const sortByTime = R.sortBy(R.prop('blocktime'))
    //   const sortedTransactions = sortByTime(results)
    //   const currentBlock = await getNodeHeight()
    //   this.currentBlock = currentBlock
    //   const updatedTransactions = await this.getInputandOutputInfo(sortedTransactions)
    //   this.transactions = updatedTransactions
    //   this.loading = false
    // },
    getType (type) {
      if (type === 'send') {
        return 'Sent'
      } else {
        return 'Received'
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
      return state
    },
    getpanelolor () {
      return 'blue'
    },
    getBTC (satoshi) {
      const satoshiBigNum = new BigNumber(satoshi)
      return satoshiBigNum.toFormat()
    },
    getpanelState (index) {
      const state = this.panel[index]
      return state
    },
    setpanelState (index) {
      const copy = R.clone(this.panel)
      copy[index] = !copy[index]
      this.panel = copy
    }
  },
  created: async function () {
    BigNumber.config({ EXPONENTIAL_AT: 10 })
    const results = await getWalletTransactions(account, walletName)
    const sortByTime = R.sortBy(R.prop('blocktime'))
    const sortedTransactions = R.reverse(sortByTime(results))
    const updatedTransactions = await this.getInputandOutputInfo(sortedTransactions)
    this.transactions = updatedTransactions
    for (var i = 0; i < this.transactions.length; i++) {
      this.panel.push(false)
    }
    console.log(updatedTransactions)
  }
}
</script>
