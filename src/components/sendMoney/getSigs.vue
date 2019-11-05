<template>
      <v-flex xs12>
        <v-card-text>
          <h1 class="display-1">Get Signatures</h1>
          <v-row
            no-gutters
            class="mb-5 mt-5"
            v-if='!allsigned'
          >
            <v-col cols="4" class="mx-auto">
                <v-card
                  class='light-blue darken-4'
                >
                  <v-card-text class="subtitle-1 white--text">
                    Sign With Hardware Wallet
                  </v-card-text>
                  <hardwareSign
                  v-on:addsigned='addsigned'
                  v-bind:plainPsbt="plainPsbt"/>
                </v-card>
            </v-col>
            <v-col cols="4" class="mx-auto">
                <v-card
                  class='light-blue darken-1'
                >
                  <v-card-text class="subtitle-1 white--text">
                    Sign With Web Wallet
                  </v-card-text>
                  <softwareSign
                  v-on:addsigned='addsigned'
                  v-bind:plainPsbt="plainPsbt"
                  v-bind:index='index'/>
                </v-card>
            </v-col>
            </v-row>
            <v-btn @click="combine()"
            class="ma-2" color="green" dark v-if='allsigned'>
              Finish
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>

        </v-card-text>
      </v-flex>

</template>

<script>
import hardwareSign from '@/components/sendMoney/sign/hardware.vue'
import softwareSign from '@/components/sendMoney/sign/software.vue'
import { vpubObject, xfp } from '@/assets/constants/userConstantFiles.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { createPSBT, combineCompletedTrans } from '@/assets/util/psbtUtil.js'
import { getWalletTransactions, broadcastHex } from '@/assets/util/nodeUtil.js'
import { getReceiveIndex, getReceivedTransactions, genAddress } from '@/assets/util/addressUtil.js'
import { getScriptPubkey } from '@/assets/util/transactionUtil/transactionUtil.js'
const R = require('ramda')
export default {
  props: ['transaction'],
  components: {
    hardwareSign,
    softwareSign
  },
  data: () => ({
    plainPsbt: '',
    signedPSBTs: {},
    m: 34,
    index: 0
  }),
  computed: {
    addressArray: function () {
      return this.transaction.addressArray
    },
    addressAmountArray: function () {
      return this.transaction.addressArrayAmount
    },
    allsigned: function () {
      const signedPSBTs = this.signedPSBTs
      const signtaures = Object.keys(signedPSBTs).length
      if (signtaures >= this.m) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addsigned: function (wallet, trans) {
      const newSigned = R.clone(this.signedPSBTs)
      newSigned[wallet] = trans
      this.signedPSBTs = newSigned
      console.log('trans added')
    },
    getAmount: function (index) {
      const amount = this.addressAmountArray[index]
      const exp = amount.shiftedBy(-8)
      return exp.toFormat(9)
    },
    async combine () {
      const trans1 = this.signedPSBTs.web
      const trans2 = this.signedPSBTs.hardware
      const trans = await combineCompletedTrans(trans1, trans2)
      const finalBraodcast = await broadcastHex(trans)
      console.log(trans)
      console.log(finalBraodcast)
    }
  },
  async created () {
    const m = 2
    const vpubArray = R.values(vpubObject)
    const transactions = await getWalletTransactions(account, walletName)
    const recIndex = await getReceiveIndex(0, transactions, vpubArray, 2)
    const address = await genAddress(recIndex, vpubArray, 2)
    const addressTransactions = await getReceivedTransactions(address, transactions)
    const txId = addressTransactions[0].txid
    const vout = addressTransactions[0].vout
    const scriptHex = await getScriptPubkey(txId, vout, walletName)
    const transInfo =
      {
        value_int: addressTransactions[0].amount * 100000000,
        txid: addressTransactions[0].txid,
        n: addressTransactions[0].vout,
        script_pub_key: scriptHex
      }
    const sendAddress = this.transaction.addressArray[0]
    const totalToSend = Math.round(this.transaction.addressArrayAmount[0].toNumber())
    const psbt = await createPSBT(recIndex, m, vpubObject, xfp, transInfo, sendAddress, totalToSend)
    this.plainPsbt = psbt
    this.index = recIndex
    this.m = m
  }
}
</script>
