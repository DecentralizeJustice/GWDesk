<template>

  <v-flex xs12>
    <v-row
      no-gutters
      justify="center"
    >
      <v-col
      :cols="6"
      >
      <v-alert type="error" v-if="tooHigh">
        Not Enough Funds
      </v-alert>
      <v-alert type="error" v-if="!allAddressesUsed">
        All Addresses Must Be Used
      </v-alert>
      </v-col>
    </v-row>
    <v-card-text>
      <h1 class="title">Pick Amounts:</h1>
    </v-card-text>
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
          <v-text-field
            v-model='amountArray[index]'
            label="BTC"
            type='number'
          ></v-text-field>
        </v-col>
        </v-row>
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
            {{changeBTC}}

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
              10~20 Minutes
            </v-card-text>
          </v-card>
        </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-flex>

</template>

<script>
import { getTransactionSize } from '@/assets/util/transactionUtil/transactionUtil.js'
import { m, vpubObject } from '@/assets/constants/userConstantFiles.js'
import { getFeeEstimate, getWalletTransactions } from '@/assets/util/nodeUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { getReceiveAddress, getReceivedCoins } from '@/assets/util/addressUtil.js'
const BigNumber = require('bignumber.js')
const R = require('ramda')
export default {
  props: ['transaction'],
  data: function () {
    return {
      musigNeeded: m,
      inputNumber: 1,
      amountArray: [],
      midFee: new BigNumber('0'),
      transSize: new BigNumber('0'),
      totalAvailable: new BigNumber('1e12'),
      currentAddress: '',
      highFee: new BigNumber('0')
    }
  },
  computed: {
    addressArray: function () {
      return this.transaction.addressArray
    },
    musigTotal: function () {
      return Object.keys(vpubObject).length
    },
    changeSatoshi: function () {
      const outPutTotal = BigNumber.sum.apply(null, this.addressArraySumSat)
      const ava = new BigNumber(this.totalAvailable)
      const change = ava.minus(this.feeAmountSatoshi.plus(outPutTotal))
      return change
    },
    changeBTC: function () {
      return this.changeSatoshi.shiftedBy(-8)
    },
    feeAmountSatoshi: function () {
      return this.highFee.times(this.transSize.shiftedBy(-3))
    },
    feeAmountBTC: function () {
      return this.feeAmountSatoshi.shiftedBy(-8)
    },
    addressArraySumSat: function () {
      const amountArray = this.amountArray
      const converToBigNum = x => new BigNumber(x)
      const converToSatoshi = x => x.shiftedBy(8)
      const bigNumArray = R.map(converToBigNum, amountArray)
      const bigNumSatoshiArray = R.map(converToSatoshi, bigNumArray)
      return bigNumSatoshiArray
    },
    tooHigh: function () {
      const outPutTotal = BigNumber.sum.apply(null, this.addressArraySumSat)
      const allTotal = outPutTotal.plus(new BigNumber(this.feeAmountSatoshi))
      const totalTooHigh = allTotal.isGreaterThan(new BigNumber(this.totalAvailable))
      if (totalTooHigh) {
        return true
      }
      if (!totalTooHigh) {
        return false
      }
      return false
    },
    allAddressesUsed: function () {
      const notZero = x => !x.isEqualTo(new BigNumber(0))
      const allUsed = R.all(notZero)(this.addressArraySumSat)
      if (allUsed) {
        return true
      }
      if (!allUsed) {
        return false
      }
      return true
    },
    transactionAmountInfo: function () {
      const transGood = this.allAddressesUsed && !this.tooHigh
      if (transGood) {
        return {
          transSize: this.transSize,
          transFee: this.feeAmountSatoshi,
          addressArrayAmount: this.addressArraySumSat,
          addressArray: this.addressArray,
          currentAddress: this.currentAddress
        }
      } else {
        return {
          addressArray: this.addressArray
        }
      }
    }
  },
  watch: {
    transactionAmountInfo: function (newval, old) {
      if (!R.equals(newval, old)) {
        this.emitNewTransaction(newval)
      }
    }
  },
  methods: {
    emitNewTransaction: function (trans) {
      this.$emit('updateTransaction', trans)
    },
    setAddressArray: function () {
      for (var i = 0; i < this.addressArray.length; i++) {
        this.amountArray.push('.00000001')
      }
    },
    noChange: function () {
      const newArray = R.update(0, this.changeBTC.toString(), this.amountArray)
      this.amountArray = newArray
    },
    setup: async function () {
      // transaction fee code
      const vpubArray = R.values(vpubObject)
      const transactions = await getWalletTransactions(account, walletName)
      const address = await getReceiveAddress(0, transactions, vpubArray, m)
      this.currentAddress = address
      const allOutputs = R.insert(-1, address, this.addressArray)
      const vBytesInt = getTransactionSize(allOutputs, this.musigNeeded, this.musigTotal,
        this.inputNumber)
      this.transSize = new BigNumber(vBytesInt)
      const feeEstimates = await getFeeEstimate()
      this.midFee = new BigNumber(feeEstimates.medium_fee_per_kb)
      this.highFee = new BigNumber(feeEstimates.high_fee_per_kb)
      // change code
      const balance = await getReceivedCoins(address, transactions)
      this.totalAvailable = new BigNumber(balance)
    }
  },
  created: async function () {
    this.$emit('updateTransaction', { addressArray: this.transaction.addressArray })
    await this.setup()
    await this.setAddressArray()
  }
}
</script>
