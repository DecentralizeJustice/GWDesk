<template>
  <v-container grid-list-md text-center fill-height text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 >
        <v-card
          class="text-center"
          elevation="0"
        >
        <v-flex xs10 class="mx-auto mb-5">
          <topStepper v-bind:currentSection="currentSection"/>
        </v-flex>

          <component
          v-bind:masterFingerprint='singleSigHardwareWalletInfo.fingerprint'
          v-bind:is="currentMain"
          v-bind:transaction="transaction"
          v-bind:singleSigInfo='allWalletInfo'
          v-on:updateAddressArray="updateAddressArray"
          v-on:updateIncompletePSBT='updateIncompletePSBT'
          v-on:updateSignedPSBT='updateSignedPSBT'
          v-on:updateFeeInfo='updateFeeInfo'
          v-on:updateBalance='updateBalance'
          v-on:updateEstimatedTime='updateEstimatedTime'/>

          <bottomNav v-on:change="updateStep"
            v-on:finish="finish"
            v-bind:transaction="transaction"
            v-bind:currentSection="currentSection"
            v-bind:continueDisabled='continueDisabled'
          />
        </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import topStepper from '@/components/btcWallet/singleSig/sendMoney/topStepper.vue'
import bottomNav from '@/components/btcWallet/singleSig/sendMoney/bottomNav.vue'
import sendToAddresses from '@/components/btcWallet/singleSig/sendMoney/sendToAddresses.vue'
import amount from '@/components/btcWallet/singleSig/sendMoney/amount.vue'
import confirm from '@/components/btcWallet/singleSig/sendMoney/confirm.vue'
import sign from '@/components/btcWallet/singleSig/sendMoney/sign.vue'
import {
  finalizeTrans
} from '@/assets/util/btc/psbtUtil.js'
import {
  broadcastTransaction
} from '@/assets/util/btc/electrum/general.js'
import { mapState, mapGetters } from 'vuex'
// const R = require('ramda')
export default {
  data: () => ({
    allWalletInfo: {},
    componentList: [sendToAddresses, amount, confirm, sign],
    currentSection: 0,
    transaction: {
      feeInfo: 0,
      addressArray: [],
      psbt: undefined,
      signedPSBT: undefined,
      balance: 0,
      estimatedTime: '',
      transactionId: ''
    }
  }),
  components: {
    topStepper,
    bottomNav,
    sendToAddresses,
    amount,
    confirm,
    sign
  },
  computed: {
    continueDisabled () {
      const trans = this.transaction
      const currentSection = this.currentSection
      const psbt = trans.psbt
      const addressArray = trans.addressArray
      switch (currentSection) {
      case 0:
        if (addressArray.length === 0) {
          return true
        }
        break
      case 1:
        if (psbt === undefined) {
          return true
        }
        break
      }
      return false
    },
    currentMain () {
      return this.componentList[this.currentSection]
    },
    ...mapState('bitcoinInfo', [
      'btcSingleSigTestnet'
    ]),
    ...mapGetters('hardwareInfo', [
      'singleSigElectrumName',
      'singleSigHardwareWalletInfo'
    ])
  },
  methods: {
    async finish () {
      const walletInfo = this.btcSingleSigTestnet
      const finalHexTransaction = await finalizeTrans(this.transaction.signedPSBT)
      console.log(finalHexTransaction)
      const result = await broadcastTransaction(finalHexTransaction,
        walletInfo.rpcPort, walletInfo.rpcUser, walletInfo.rpcPassword)
      this.transaction.transactionId = result.data.result
    },
    updateStep (stepUpdate) {
      if (stepUpdate === 'continue') {
        this.currentSection += 1
      }
      if (stepUpdate === 'back') {
        if (this.currentSection !== 0) {
          this.currentSection -= 1
        } else {
          this.$emit('change', 'landingPage')
        }
      }
    },
    updateIncompletePSBT (newPSBT) {
      this.transaction.psbt = newPSBT
    },
    updateSignedPSBT (newPSBT) {
      this.transaction.signedPSBT = newPSBT
    },
    updateAddressArray (newArray) {
      this.transaction.addressArray = newArray
    },
    updateFeeInfo (amount) {
      this.transaction.feeInfo = amount
    },
    updateBalance (amount) {
      this.transaction.balance = amount
    },
    updateEstimatedTime (time) {
      this.transaction.estimatedTime = time
    }
  },
  mounted () {
    this.allWalletInfo.fingerprint = this.singleSigHardwareWalletInfo.fingerprint
    this.allWalletInfo.vpub = this.singleSigHardwareWalletInfo.vpub
    this.allWalletInfo.path = this.singleSigHardwareWalletInfo.vpubPath
    this.allWalletInfo.walletName = this.singleSigElectrumName
    this.allWalletInfo.network = this.btcSingleSigTestnet.network
    this.allWalletInfo.rpcPassword = this.btcSingleSigTestnet.rpcPassword
    this.allWalletInfo.rpcUser = this.btcSingleSigTestnet.rpcUser
    this.allWalletInfo.rpcPort = this.btcSingleSigTestnet.rpcPort
  }
}
</script>
