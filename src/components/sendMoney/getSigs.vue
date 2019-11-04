<template>

      <v-flex xs12>
        <v-card-text>
          <h1 class="display-1">Get Signatures</h1>
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
                    Send Amount: <br> {{getAmount(index)}}
                  </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        </v-flex>

</template>

<script>
// import { genAddress } from '@/assets/util/addressUtil.js'
import { vpubObject, xfp } from '@/assets/constants/userConstantFiles.js'
import { account, walletName } from '@/assets/constants/genConstants.js'
import { createPSBT } from '@/assets/util/psbtUtil.js'
import { getWalletTransactions } from '@/assets/util/nodeUtil.js'
import { getReceiveIndex, getReceivedTransactions, genAddress } from '@/assets/util/addressUtil.js'
import { getScriptPubkey } from '@/assets/util/transactionUtil/transactionUtil.js'
const R = require('ramda')
export default {
  props: ['transaction'],
  data: () => ({
    psbt: ''
  }),
  computed: {
    addressArray: function () {
      return this.transaction.addressArray
    },
    addressAmountArray: function () {
      return this.transaction.addressArrayAmount
    }
  },
  methods: {
    getAmount: function (index) {
      const amount = this.addressAmountArray[index]
      const exp = amount.shiftedBy(-8)
      return exp.toFormat(9)
    }
  },
  async created () {
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
    const send = this.transaction.addressArray[0]
    const totalToSend = this.transaction.addressArrayAmount[0].toNumber()
    const psbt = await createPSBT(recIndex, 2, vpubObject, xfp, transInfo, send, totalToSend)
    this.psbt = psbt
    console.log(psbt)
  }
}
</script>
