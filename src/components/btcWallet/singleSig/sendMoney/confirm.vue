<template>
  <v-flex xs12>
    <v-card-text>
      <h1 class="display-1">Transaction Overview</h1>
      <v-row
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
      </v-row>
    </v-card-text>
    <v-card
      class='deep-purple darken-2'
    >
      <v-card-text class="title white--text">
        Balance After Transaction: {{balanceAfterTransaction}} BTC<br>
        Total Fees: {{feeAmount}} BTC<br>
        Estimated Time: {{estimatedTime}}<br>
      </v-card-text>
    </v-card>

  </v-flex>
</template>

<script>
import {
  decodeElectrumPsbt
} from '@/assets/util/btc/psbtUtil.js'
const R = require('ramda')
export default {
  props: ['transaction'],
  data: () => ({
    psbtInfo: {}
  }),
  computed: {
    addressArray: function () {
      const changeIndex = this.psbtInfo.changeIndex
      if (changeIndex !== undefined) {
        const newArray = R.remove(changeIndex, 1, this.psbtInfo.addressArray)
        return newArray
      }
      return this.psbtInfo.addressArray
    },
    balanceAfterTransaction: function () {
      return (this.transaction.balance - this.psbtInfo.inputSum + this.psbtInfo.changeAmount).toFixed(8)
    },
    feeAmount: function () {
      return this.psbtInfo.feeAmount
    },
    estimatedTime: function () {
      return this.transaction.estimatedTime
    }
  },
  methods: {
    getAmount: function (index) {
      return this.psbtInfo.amountArray[index].toFixed(8)
    }
  },
  mounted: async function () {
    this.psbtInfo = await decodeElectrumPsbt(this.transaction.psbt)
    // console.log(this.transaction)
    // console.log(this.psbtInfo)
  }
}
</script>
