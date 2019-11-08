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
              10~20 Minutes
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
import { getTransactionSize } from '@/assets/util/transactionUtil/transactionUtil.js'
import { m, vpubObject } from '@/assets/constants/userConstantFiles.js'
import { getFeeEstimate, getWalletTransactions } from '@/assets/util/nodeUtil.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { getReceiveAddress, getReceivedCoins, getChangeAddress } from '@/assets/util/addressUtil.js'
const BigNumber = require('bignumber.js')
BigNumber.set({ DECIMAL_PLACES: 8 })
const R = require('ramda')
export default {
  props: ['transaction'],
  data: function () {
    return {
      speed: 2,
      amountArray: [],
      highFee: new BigNumber('0'),
      midFee: new BigNumber('0'),
      lowFee: new BigNumber('0'),
      transSize: new BigNumber('0'),
      totalAvailable: new BigNumber('1e12'),
      currentAddress: '',
      changeAddress: '',
      rules: {
        required: value => !new BigNumber(value).isEqualTo(new BigNumber(0)) ||
          "Can't Be Zero",
        counter: value => new BigNumber(value).dp() < 9 || 'Invalid Amount'
      }
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
      const available = this.totalAvailable.minus(this.feeAmountSatoshi)
      const change = available.minus(outPutTotal.dp(0)).dp(0)
      return change
    },
    changeBTC: function () {
      return this.changeSatoshi.shiftedBy(-8)
    },
    feeAmountSatoshi: function () {
      const choice = this.speed
      const speedArray = [this.lowFee, this.midFee, this.highFee]
      const feeRatio = speedArray[choice]
      const transSizeKVbytes = this.transSize.shiftedBy(-3)
      const fee = feeRatio.times(transSizeKVbytes).dp(0)
      return fee
    },
    feeAmountBTC: function () {
      return this.feeAmountSatoshi.shiftedBy(-8)
    },
    addressArraySumSat: function () {
      const amountArray = this.amountArray
      const converToBigNum = x => new BigNumber(x)
      const converToSatoshi = x => x.shiftedBy(8).dp(0)
      const bigNumArray = R.map(converToBigNum, amountArray)
      const bigNumSatoshiArray = R.map(converToSatoshi, bigNumArray)
      return bigNumSatoshiArray
    },
    tooHigh: function () {
      const outPutTotal = BigNumber.sum.apply(null, this.addressArraySumSat)
      const allTotal = outPutTotal.plus(new BigNumber(this.feeAmountSatoshi))
      const totalTooHigh = allTotal.isGreaterThan(new BigNumber(this.totalAvailable).dp(0))
      if (totalTooHigh) {
        return true
      } else {
        return false
      }
    },
    allAddressesUsed: function () {
      const notZero = x => !x.isEqualTo(new BigNumber(0))
      const allUsed = R.all(notZero)(this.addressArraySumSat)
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
      const newAmount = this.changeBTC.plus(new BigNumber('.00000001'))
      const newArray = R.update(0, newAmount.toString(), this.amountArray)
      this.amountArray = newArray
    },
    setup: async function () {
      // transaction fee code
      const vpubArray = R.values(vpubObject)
      const transactions = await getWalletTransactions(account, walletName)
      const address = await getReceiveAddress(0, transactions, vpubArray, m)
      this.currentAddress = address
      const inputNumber = 1
      const musigTotal = vpubArray.length
      this.changeAddress = await getChangeAddress(0, transactions, vpubArray, m, false)
      const allOutputs = R.insert(-1, this.changeAddress, this.addressArray)
      const vBytesInt = getTransactionSize(allOutputs, m, musigTotal,
        inputNumber)
      this.transSize = new BigNumber(vBytesInt)
      const feeEstimates = await getFeeEstimate()
      this.midFee = new BigNumber(feeEstimates.medium_fee_per_kb)
      this.highFee = new BigNumber(feeEstimates.high_fee_per_kb)
      this.lowFee = new BigNumber(feeEstimates.low_fee_per_kb)
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
