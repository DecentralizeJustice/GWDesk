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
          v-bind:is="currentMain"
          v-bind:transaction="transaction"
          v-bind:singleSigInfo='singleSigInfo'
          v-on:updateAddressArray="updateAddressArray"
          v-on:updateIncompletePSBT='updateIncompletePSBT'
          v-on:updateSignedPSBT='updateSignedPSBT'/>

          <bottomNav v-on:change="updateStep"
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
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('bitcoinInfo')
export default {
  data: () => ({
    componentList: [sendToAddresses, amount, confirm, sign],
    currentSection: 0,
    transaction: {
      addressArray: [],
      psbt: undefined,
      signedPSBT: undefined
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
      switch (currentSection) {
        case 0:
          if (trans.addressArray.length === 0) {
            return true
          }
          break
        case 1:
          if (trans.psbt === undefined) {
            return true
          }
          break
      }
      return false
    },
    currentMain () {
      return this.componentList[this.currentSection]
    },
    ...mapState({
      singleSigInfo: state => state.btcSingleSig
    })
  },
  methods: {
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
    }
  }
}
</script>
