<template>
  <div>
  <v-col
  :cols="12"
  >
    <v-row
      justify="center"
      v-if='tooHigh'
    >
      <v-col
      :cols="6"
      >
      <v-alert type="error" >
        Not Enough Money
      </v-alert>

      </v-col>
    </v-row>

    <v-row class="mx-auto" dense>
      <v-col align-content='center' cols='12'>
        <v-card-text>
          <h1 class="headline">Pick Amounts:</h1>
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
          :readonly='pause'
          v-model='newTransInfo.amountArray[index]'
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
            cols="4"
            align-self='center'
          >
          <v-card
            class='indigo lighten-1'
          >
          <v-card-text class="subtitle-1 white--text">
            <h1 class="title">Change:</h1>
            {{changeAmount}} BTC
          </v-card-text>
          <v-card-text class="subtitle-1 white--text">
            <h1 class="title">Available Balance:</h1>
            {{balance}} BTC
          </v-card-text>
          <!-- <v-btn v-if="addressArray.length === 1" color="red lighten-1" class="mb-2" @click="send">
            No Change
          </v-btn> -->
          </v-card>
          </v-col>
          <v-col cols="7" align-self='center'>
            <v-card
              class='deep-purple lighten-1'
            >
            <h1 class="title py-2">Transaction Time:</h1>
          <v-btn-toggle
            v-model="newTransInfo.speed"
            class="mb-2"
            mandatory
          >
          <v-btn v-for="(item,index) in speedSelectGroup" :key="index"
            :disabled='pause'>
            <span>{{item}}</span>
          </v-btn>
          </v-btn-toggle>
          <v-card-text class="subtitle-1 white--text">
            <h1 class="title">Fee Cost:</h1>
            {{feeAmount}} BTC
            <!-- <h1 class="title">Fee Ratio:</h1>
            {{feeRatio}}%  -->
          </v-card-text>
          <!-- <v-col cols="12" justify-self='center' align-self='center'
            style="background-color: #263238;">
        </v-col>
          <v-alert tile v-if='feeRatio>10' :type='feeWarningRatio' >
            High Fee Amount
          </v-alert> -->
          </v-card>

        </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</div>
</template>

<script>
import {
  send, getBalance // sendAll
} from '@/assets/util/btc/electrum/general.js'
import {
  decodeElectrumPsbt
} from '@/assets/util/btc/psbtUtil.js'
import { getAllFeeRates } from '@/assets/views/btcSingleSig/send.js'
const BigNumber = require('bignumber.js')
const R = require('ramda')
export default {
  props: ['transaction', 'singleSigInfo'],
  data: function () {
    return {
      oldTransInfo: {
        amountArray: [],
        speed: 0
      },
      newTransInfo: {
        amountArray: [],
        speed: 0
      },
      speedSelectGroup: [
        '4 Hours', '1.5 Hours', '50 Min', '20 Min', '10 Min'
      ],
      transAmountInfoPSBT: {},
      pause: false,
      tooHigh: false,
      balance: 0,
      feeInfo: {},
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
    // feeWarningRatio: function () {
    //   if (this.feeRatio > 30) {
    //     return 'error'
    //   }
    //   if (this.feeRatio > 20) {
    //     return 'warning'
    //   }
    //   if (this.feeRatio > 10) {
    //     return 'info'
    //   }
    //   return 'info'
    // },
    feeArrayOptions: function () {
      const feeInfo = this.feeInfo
      return [feeInfo['20'], feeInfo['10'], feeInfo['5'],
        feeInfo['2'], feeInfo['1']]
    },
    changeAmount: function () {
      return this.transAmountInfoPSBT.changeAmount
    },
    feeAmount: function () {
      return this.transAmountInfoPSBT.feeAmount
    },
    chossenFeeRate: function () {
      return this.feeArrayOptions[this.newTransInfo.speed]
    },
    addressArray: function () {
      return this.transaction.addressArray
    }
    // allAddressesUsed: function () {
    //   const notZero = x => !x.isEqualTo(new BigNumber(0))
    //   const allUsed = R.all(notZero)(this.addressArraySat)
    //   const allValuesExist = this.addressArraySat.length === this.addressArray.length
    //   if (allUsed && allValuesExist) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    // allValidAmounts: function () {
    //   const notZero = x => new BigNumber(x).dp() < 9
    //   const allValid = R.all(notZero)(this.amountArray)
    //   if (allValid) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
  },
  watch: {
    newTransInfo: {
      handler (newval) {
        if (!R.equals(newval, this.oldTransInfo)) {
          this.send()
        }
      },
      deep: true
    }
  },
  methods: {
    firstSend: async function () {
      try {
        const singleSigInfo = this.singleSigInfo
        const feeRate = this.chossenFeeRate / 1000
        const trans = await send(feeRate, this.newTransInfo.amountArray, this.addressArray,
          singleSigInfo.electrumWalletName, singleSigInfo.rpcport, singleSigInfo.rpcuser,
          singleSigInfo.rpcpassword, singleSigInfo.network)
        this.updateTransInfo(trans.data.result)
      } catch (err) {
        this.pause = true
        this.tooHigh = true
        console.log('Major Issue')
        console.log(err)
      }
    },
    send: async function () {
      try {
        this.pause = true
        const singleSigInfo = this.singleSigInfo
        const feeRate = this.chossenFeeRate / 1000
        const trans = await send(feeRate, this.newTransInfo.amountArray, this.addressArray,
          singleSigInfo.electrumWalletName, singleSigInfo.rpcport, singleSigInfo.rpcuser,
          singleSigInfo.rpcpassword, singleSigInfo.network)
        this.oldTransInfo = R.clone(this.newTransInfo)
        this.updateTransInfo(trans.data.result)
        this.pause = false
      } catch (err) {
        this.triggerTooHigh()
        this.newTransInfo = R.clone(this.oldTransInfo)
      }
    },
    triggerTooHigh: async function () {
      function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      this.tooHigh = true
      this.pause = true
      await sleep(4000)
      this.tooHigh = false
      this.pause = false
    },
    updateTransInfo: async function (psbt) {
      this.transAmountInfoPSBT = await decodeElectrumPsbt(psbt)
      this.$emit('updateFeeInfo', (this.chossenFeeRate / 1000))
      this.$emit('updateIncompletePSBT', psbt)
      this.$emit('updateBalance', Number(this.balance))
      this.$emit('updateEstimatedTime', this.speedSelectGroup[this.newTransInfo.speed])
    },
    noChange: async function () {
    },
    setBalance: async function () {
      const singleSigInfo = this.singleSigInfo
      const balance = await getBalance(singleSigInfo.electrumWalletName,
        singleSigInfo.rpcport, singleSigInfo.rpcuser, singleSigInfo.rpcpassword,
        singleSigInfo.network)
      this.balance = balance.data.result.confirmed
      return true
    },
    setupFeeInfo: async function () {
      const walletInfo = this.singleSigInfo
      const feeInfo = await
      getAllFeeRates(walletInfo.rpcport, walletInfo.rpcuser, walletInfo.rpcpassword)
      this.feeInfo = feeInfo
      return true
    },
    fillinAmounts: async function () {
      for (var i = 0; i < this.transaction.addressArray.length; i++) {
        this.newTransInfo.amountArray.push('.00000001')
        this.oldTransInfo.amountArray.push('.00000001')
      }
      return true
    }
  },
  mounted: async function () {
    await this.setupFeeInfo()
    await this.setBalance()
    await this.fillinAmounts()
    await this.firstSend()
  }
}
</script>
