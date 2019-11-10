<template>

  <v-col
  :cols="12"
  >
    <v-row
      justify="center"
      v-if="tooHigh"
    >
      <v-col
      :cols="6"
      >
      <v-alert type="error" >
        Not Enough Funds
      </v-alert>
      </v-col>
    </v-row>

    <v-row class="mx-auto">
      <v-col align-content='center' cols='12'>
        <v-card-text>
          <h1 class="title">Pick Amounts:</h1>
        </v-card-text>
      </v-col>
      <v-col align-content='center' cols='9'>
        <v-card-text>
          <h2 class="">Adresses:</h2>
        </v-card-text>
      </v-col>
      <v-col align-content='center' cols='3'>
        <v-card-text>
          <h2 class="">Amounts:</h2>
        </v-card-text>
      </v-col>
    </v-row>

      <v-row align-content='center' cols="12"
        v-for="(item,index) in addressArray" :key="index">
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
        <v-text-field
          v-model='amountArray[index]'
          :rules="[rules.required, rules.counter]"
          label="BTC"
          type='number'
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row
      no-gutters
      class="mb-5"
    >
      <v-col cols="12" class="mx-auto">
        <v-row align-content='center' justify='space-around'>
          <v-col
            cols="4"
            align-self='center'
          >
          <v-card
            class='indigo lighten-1'
          >
          <v-card-text class="subtitle-1 white--text">
            <h1 class="title">Change:</h1>
            {{changeBTC}} BTC

          </v-card-text>
          <v-btn color="red lighten-1" class="mb-2" @click="noChange">
            No Change
          </v-btn>
          </v-card>
          </v-col>
          <v-col cols="4" align-self='center'>
            <v-card
              class='deep-purple lighten-1'
            >
            <v-card-text class="subtitle-1 white--text">
              <h1 class="title">Transaction Time:</h1>
              {{time}}
              <h1 class="title">Fee Amount:</h1>
              {{feeAmountBTC}} BTC
            </v-card-text>

          <v-btn-toggle
            v-model="speed"
            class="mb-2"
          >
            <v-btn>
              <span class="hidden-sm-and-down">Slow</span>
            </v-btn>
            <v-btn>
              <span class="hidden-sm-and-down">Meduim</span>
            </v-btn>
            <v-btn>
              <span class="hidden-sm-and-down">Fast</span>
            </v-btn>
          </v-btn-toggle>
          </v-card>

        </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>

</template>

<script>
import { getTrasactionData, noChange } from '@/assets/util/transactionUtil/transactionUtil.js'
import { getFeeEstimate, getUTXO } from '@/assets/util/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
const BigNumber = require('bignumber.js')
const R = require('ramda')
export default {
  props: ['transaction'],
  data: function () {
    return {
      speed: 2,
      tooHigh: false,
      amountArray: [],
      highFee: new BigNumber('0'),
      midFee: new BigNumber('0'),
      lowFee: new BigNumber('0'),
      transactionInfo: 'undefined',
      rules: {
        required: value => !new BigNumber(value).isEqualTo(new BigNumber(0)) ||
          "Can't Be Zero",
        counter: value => new BigNumber(value).dp() < 9 || 'Invalid Amount'
      }
    }
  },
  computed: {
    time: function () {
      switch (this.speed) {
        case 0:
          return '1 Hour +'
        case 1:
          return '~30-60 minutes'
        case 2:
          return '~10-20 minutes'
      }
      return 'Testing'
    },
    addressArray: function () {
      return this.transaction.addressArray
    },
    changeSatoshi: function () {
      if (this.transactionInfo !== 'undefined') {
        const utxoArray = this.transactionInfo.remainingUtxo
        if (R.isEmpty(utxoArray)) {
          return this.transactionInfo.changeAmount
        }
        const getValue = x => new BigNumber(x.value)
        const mapValue = R.map(getValue, utxoArray)
        const utxoSum = BigNumber.sum.apply(null, mapValue)
        const change = utxoSum.plus(this.transactionInfo.changeAmount)
        return change
      }
      return new BigNumber(0)
    },
    changeBTC: function () {
      return this.changeSatoshi.shiftedBy(-8)
    },
    feeAmountSatoshi: function () {
      if (this.transactionInfo !== 'undefined') {
        const fee = this.transactionInfo.feeAmount
        return fee
      }
      return new BigNumber(0)
    },
    minFeeRatio: function () {
      const choice = this.speed
      const speedArray = [this.lowFee, this.midFee, this.highFee]
      const minFeeRatio = speedArray[choice]
      return minFeeRatio
    },
    feeAmountBTC: function () {
      return this.feeAmountSatoshi.shiftedBy(-8)
    },
    addressArraySat: function () {
      const amountArray = this.amountArray
      const converToBigNum = x => new BigNumber(x)
      const converToSatoshi = x => x.shiftedBy(8).dp(0)
      const bigNumArray = R.map(converToBigNum, amountArray)
      const bigNumSatoshiArray = R.map(converToSatoshi, bigNumArray)
      return bigNumSatoshiArray
    },
    allAddressesUsed: function () {
      const notZero = x => !x.isEqualTo(new BigNumber(0))
      const allUsed = R.all(notZero)(this.addressArraySat)
      if (allUsed) {
        return true
      } else {
        return false
      }
    },
    allValidAmounts: function () {
      const notZero = x => new BigNumber(x).dp() < 9
      const allValid = R.all(notZero)(this.amountArray)
      if (allValid) {
        return true
      } else {
        return false
      }
    },
    transactionAmountInfo: function () {
      const allUsed = this.allAddressesUsed
      const notTooHigh = !this.tooHigh
      const allValidAmounts = this.allValidAmounts
      const transGood = allUsed && notTooHigh && allValidAmounts
      if (transGood) {
        return {
          transSize: this.transactionInfo.transactionSize,
          transFee: this.transactionInfo.feeAmount,
          transInputs: this.transactionInfo.inputs,
          addressArrayAmount: this.addressArraySat,
          addressArray: this.addressArray,
          remainingUtxo: this.transactionInfo.remainingUtxo,
          change: this.transactionInfo.changeAmount
        }
      } else {
        return {
          addressArray: this.addressArray
        }
      }
    }
  },
  watch: {
    amountArray: function () {
      this.getTransInfo()
    },
    minFeeRatio: function () {
      this.getTransInfo()
    },
    transactionAmountInfo: function (newval, old) {
      if (!R.equals(newval, old)) {
        this.emitNewTransaction(newval)
      }
    }
  },
  methods: {
    getTransInfo: async function functionName () {
      try {
        const coins = await getUTXO(walletName)
        const transaction = await getTrasactionData(this.addressArray,
          this.addressArraySat, coins, this.minFeeRatio)
        this.transactionInfo = transaction
        this.tooHigh = false
      } catch (error) {
        this.tooHigh = true
      }
    },
    emitNewTransaction: function (trans) {
      this.$emit('updateTransaction', trans)
    },
    setAddressArray: function () {
      for (var i = 0; i < this.addressArray.length; i++) {
        this.amountArray.push('.00000001')
      }
    },
    noChange: async function () {
      const coins = await getUTXO(walletName)
      const newarray = await noChange(this.minFeeRatio, this.addressArray, this.addressArraySat, coins)
      this.amountArray = newarray
    },
    setupFeeInfo: async function () {
      const feeEstimates = await getFeeEstimate()
      this.midFee = new BigNumber(feeEstimates.medium_fee_per_kb).shiftedBy(-3)
      this.highFee = new BigNumber(feeEstimates.high_fee_per_kb).shiftedBy(-3)
      this.lowFee = new BigNumber(feeEstimates.low_fee_per_kb).shiftedBy(-3)
    }
  },
  created: async function () {
    this.$emit('updateTransaction', { addressArray: this.transaction.addressArray })
    await this.setupFeeInfo()
    await this.setAddressArray()
    await this.getTransInfo
  }
}
</script>
