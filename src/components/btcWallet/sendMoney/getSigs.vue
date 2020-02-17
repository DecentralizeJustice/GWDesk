<template>
      <v-flex xs12>
        <v-progress-circular
        indeterminate
        color="primary"
        v-if='loading'
        :size="150"
        />
        <v-card-text v-if='!loading'>
          <h1 class="display-1">Get Signatures</h1>
          <v-row
            no-gutters
            class="mb-5 mt-5"
            v-if='!allsigned'
          >
            <v-col cols="3" class="mx-auto" v-for="(index, item) in wallets" :key="index">
                <v-card
                  class='light-blue darken-4'
                >
                  <v-card-text class="subtitle-1 white--text">
                    Sign With Hardware Wallet {{item + 1}}
                  </v-card-text>
                  <hardwareSign
                  v-on:addsigned='addsigned'
                  v-bind:plainPsbt="plainPsbt"
                  v-bind:index="index"/>
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
import hardwareSign from '@/components/btcWallet/sendMoney/sign/hardware.vue'
import { vpubObject, xfp, m } from '@/assets/constants/userConstantFiles.js'
import { createPSBT, combineCompletedTrans } from '@/assets/util/psbtUtil.js'
import { broadcastTrans } from '@/assets/util/networkUtil.js'
import { formTransactionData } from '@/assets/util/transactionUtil/transactionUtil.js'
const R = require('ramda')
export default {
  props: ['transaction'],
  components: {
    hardwareSign
  },
  data: () => ({
    plainPsbt: '',
    signedPSBTs: {},
    transactionData: {},
    loading: true
  }),
  computed: {
    allsigned: function () {
      const signedPSBTs = this.signedPSBTs
      const signtaures = Object.keys(signedPSBTs).length
      if (signtaures >= m) {
        return true
      } else {
        return false
      }
    },
    wallets: function () {
      const num = Object.keys(xfp).length
      const array = []
      console.log(num)
      for (var i = 0; i < num; i++) {
        array[i] = i
      }
      return array
    }
  },
  methods: {
    addsigned: function (wallet, trans) {
      const newSigned = R.clone(this.signedPSBTs)
      newSigned[wallet] = trans
      this.signedPSBTs = newSigned
      console.log('trans added')
    },
    async combine () {
      const signedArray = []
      for (var variable in this.signedPSBTs) {
        signedArray.push(variable)
      }
      const trans = await combineCompletedTrans(signedArray[0], signedArray[1])
      console.log(trans)
      const finalBraodcast = await broadcastTrans(trans)
      console.log(finalBraodcast)
    }
  },
  async created () {
    const transactionData = await formTransactionData(this.transaction)
    const psbt = await createPSBT(transactionData, vpubObject, xfp)
    this.plainPsbt = psbt
    this.transactionData = transactionData
    this.loading = false
    console.log('psbt created')
  }
}
</script>
