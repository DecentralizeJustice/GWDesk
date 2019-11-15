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
                  />
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
import { vpubObject, xfp, m } from '@/assets/constants/userConstantFiles.js'
import { createPSBT, combineCompletedTrans } from '@/assets/util/psbtUtil.js'
import { broadcastTrans } from '@/assets/util/networkUtil.js'
import { formTransactionData } from '@/assets/util/transactionUtil/transactionUtil.js'
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
    transctionData: {}
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
      const trans1 = this.signedPSBTs.web
      const trans2 = this.signedPSBTs.hardware
      const trans = await combineCompletedTrans(trans1, trans2)
      const finalBraodcast = await broadcastTrans(trans)
      console.log(trans)
      console.log(finalBraodcast)
    }
  },
  async created () {
    const transctionData = await formTransactionData(this.transaction)
    const psbt = await createPSBT(transctionData, vpubObject, xfp)
    this.plainPsbt = psbt
    this.transctionData = transctionData
    console.log('psbt created')
  }
}
</script>
