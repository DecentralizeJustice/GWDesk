<template>
  <div>
  <v-progress-circular
  indeterminate
  color="primary"
  v-if='loading'
  :size="150"
  />
  <v-col
  :cols="12"
  v-if='!loading'
  >
    <v-row
      justify="center"
      v-if='tooHigh'
    >
      <v-col
      :cols="6"
      >
      <v-alert type="error" >
        Not Enough Funds
      </v-alert>

      </v-col>
    </v-row>

    <v-row class="mx-auto" dense no-gutters>
      <v-col align-content='center' cols='12'>
        <v-card-text>
          <h1 class="title">Pick Amounts & Fees:</h1>
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
          :rules="[rules.required, rules.counter, rules.hasToExist]"
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
            cols="3"
            align-self='center'
          >
          <v-card
            class='indigo lighten-1'
          >
          <v-card-text class="subtitle-1 white--text">
            <h1 class="title">Change:</h1>
            {{changeBTC}} BTC

          </v-card-text>
          <v-btn v-if="addressArray.length === 1" color="red lighten-1" class="mb-2" @click="noChange">
            No Change
          </v-btn>
          </v-card>
          </v-col>
          <v-col cols="7" align-self='center'>
            <v-card
              class='deep-purple lighten-1'
            >
            <v-card-text class="subtitle-1 white--text">
              <h1 class="title">Transaction Time:</h1>
              {{time}}
              <h1 class="title">Fee Amount:</h1>
              {{feeAmountBTC}} BTC
              <h1 class="title">Fee Ratio:</h1>
              {{feeRatio}}%
            </v-card-text>

          <v-btn-toggle
            v-model="speed"
            class="mb-2"
          >
          <v-btn>
            <span>Lowest</span>
          </v-btn>
            <v-btn>
              <span>Slow</span>
            </v-btn>
            <v-btn>
              <span>Meduim</span>
            </v-btn>
            <v-btn color='green'>
              <span>Fast</span>
            </v-btn>
          </v-btn-toggle>
          <v-col cols="12" justify-self='center' align-self='center'
            style="background-color: #263238;">
          <v-text-field
            :value='feeRatioInput'
            label="Fee sat/byte"
            type='number'
            @input="setCustomFee"
            :rules="[rules.feePrecise(feeRatioInput), rules.feeExist(feeRatioInput),
              rules.feeNotZero(feeRatioInput), rules.feeNotLessThan1(feeRatioInput)]"
          ></v-text-field>
        </v-col>
          <v-alert tile v-if='feeRatio>10' :type='feeWarningRatio' >
            High Fee Amount
          </v-alert>
          </v-card>

        </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</div>
</template>

<script>
import { getTransactionData, noChange } from
  '@/assets/util/transactionUtil/transactionUtil.js'
import { getFeeEstimate, getUTXO } from '@/assets/util/nodeUtil.js'
import { walletName } from '@/assets/constants/genConstants.js'
const BigNumber = require('bignumber.js')
const R = require('ramda')
export default {
  props: ['transaction'],
  data: function () {
    return {
      speed: 0,
      loading: true,
      tooHigh: false,
      amountArray: [],
      highFee: new BigNumber('0'),
      midFee: new BigNumber('0'),
      lowFee: new BigNumber('0'),
      minFee: new BigNumber('1'),
      transactionInfo: 'undefined',
      customFee: 0,
      rules: {
        required: value => !new BigNumber(value).isZero() ||
          "Can't Be Zero",
        counter: value => new BigNumber(value).dp() < 9 || 'Invalid Amount',
        hasToExist: value => !!value || 'Required.',
        feeExist: value => !value.isNaN() || 'Required Custom or Template Fee.',
        feePrecise: value => new BigNumber(value).dp() < 4 || 'Too Precise Amount',
        feeNotZero: value => !(new BigNumber(value).isZero()) || "Can't be zero.",
        feeNotLessThan1: value => !(new BigNumber(value).isLessThan(new BigNumber(1))) || 'Below Min. Fee'
      }
    }
  },
  computed: {
    time: function () {
      switch (this.speed) {
        case 1:
          return '1 Hour +'
        case 2:
          return '~30-60 minutes'
        case 3:
          return '~10-20 minutes'
      }
      return 'Unknown Custom Time'
    },
    feeWarningRatio: function () {
      if (this.feeRatio > 30) {
        return 'error'
      }
      if (this.feeRatio > 20) {
        return 'warning'
      }
      if (this.feeRatio > 10) {
        return 'info'
      }
      return 'info'
    },
    addressArray: function () {
      return this.transaction.addressArray
    },
    changeSatoshi: function () {
      if (this.transactionInfo === 'undefined') {
        return new BigNumber(0)
      }
      const utxoArray = this.transactionInfo.remainingUtxo
      if (R.isEmpty(utxoArray)) {
        return this.transactionInfo.changeAmount
      }
      const getValue = x => new BigNumber(x.value)
      const mapValue = R.map(getValue, utxoArray)
      const utxoSum = BigNumber.sum.apply(null, mapValue)
      const change = utxoSum.plus(this.transactionInfo.changeAmount)
      return change
    },
    changeBTC: function () {
      return this.changeSatoshi.shiftedBy(-8)
    },
    feeRatio: function () {
      if (this.transactionInfo === 'undefined') {
        return 1
      }
      const fee = this.transactionInfo.feeAmount
      const getInputValue = x => new BigNumber(x.value)
      const mapValue = R.map(getInputValue, this.transactionInfo.inputs)
      const utxoSum = BigNumber.sum.apply(null, mapValue)
      const ratio = fee.dividedBy(utxoSum).shiftedBy(2).toFixed(0, 2)
      return ratio
    },
    feeRatioInput: function () {
      if (this.speed === undefined) {
        return new BigNumber(this.customFee)
      }
      return this.minFeeRatio
    },
    feeAmountSatoshi: function () {
      if (this.transactionInfo === 'undefined') {
        return new BigNumber(0)
      }
      const fee = this.transactionInfo.feeAmount
      return fee
    },
    minFeeRatio: function () {
      if (this.speed === undefined) {
        return new BigNumber(this.customFee)
      }
      const choice = this.speed
      const speedArray = [this.minFee, this.lowFee, this.midFee, this.highFee]
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
      const allValuesExist = this.addressArraySat.length === this.addressArray.length
      if (allUsed && allValuesExist) {
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
      if (this.transactionInfo === 'undefined') {
        return {
          addressArray: this.addressArray
        }
      }
      const allUsed = this.allAddressesUsed
      const notTooHigh = !this.tooHigh
      const allValidAmounts = this.allValidAmounts
      const feeNotBelow1 = !this.feeRatioInput.isLessThan(new BigNumber(1))
      const feeValid = this.feeRatioInput.isNaN() === false &&
        this.feeRatioInput.isZero() === false && this.feeRatioInput.dp() < 4
      const transGood = allUsed && notTooHigh && allValidAmounts && feeValid &&
        feeNotBelow1
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
    setCustomFee: async function (fee) {
      this.speed = undefined
      this.customFee = fee
    },
    getTransInfo: async function () {
      try {
        const coins = await getUTXO(walletName)
        const transaction = await getTransactionData(this.addressArray,
          this.addressArraySat, coins, this.minFeeRatio)
        this.transactionInfo = transaction
        this.tooHigh = false
      } catch (error) {
        if (error.message === 'Not Enough Funds') {
          this.tooHigh = true
        } else {
          throw error
        }
      }
    },
    emitNewTransaction: function (trans) {
      this.$emit('updateTransaction', trans)
    },
    noChange: async function () {
      const coins = await getUTXO(walletName)
      const newarray = await noChange(this.minFeeRatio, this.addressArray, this.addressArraySat, coins)
      this.amountArray = newarray
    },
    setupFeeInfo: async function () {
      const feeEstimates = await getFeeEstimate()
      this.midFee = new BigNumber(feeEstimates.medium_fee_per_kb).shiftedBy(-3).dp(3)
      this.highFee = new BigNumber(feeEstimates.high_fee_per_kb).shiftedBy(-3).dp(3)
      this.lowFee = new BigNumber(feeEstimates.low_fee_per_kb).shiftedBy(-3).dp(3)
      this.customFee = this.highFee.toFormat(3)
    },
    fillinAmounts: async function () {
      for (var i = 0; i < this.transaction.addressArray.length; i++) {
        this.amountArray.push('.00000001')
      }
      return true
    }
  },
  created: async function () {
    this.$emit('updateTransaction', { addressArray: this.transaction.addressArray })
    await this.setupFeeInfo()
    await this.getTransInfo
    await this.fillinAmounts()
    this.loading = false
  }
}
</script>
