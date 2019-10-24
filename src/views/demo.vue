<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-text>
              <h2>{{receiveAddress}}</h2>
            </v-card-text>
            <v-card-actions class="text-xs-center">
              <v-flex class="text-xs-center">
                <v-btn text color="primary" v-on:click="getAddress()">Get Receive Address</v-btn>
                <v-btn text color="primary" v-on:click="downloadPSBTTo()">Download PSBT File</v-btn>
                <v-btn text color="primary" v-on:click="updatePSBT()">Update PSBT Hex</v-btn>
                <!-- <v-btn text color="primary" v-on:click="uploadPSBT()">Upload Hardware Signed PBST</v-btn>
                <v-btn text color="primary" v-on:click="combine (hardwareSignedHex, softwareSignedHex)">
                  Combine and Broadcast Trans</v-btn> -->
              </v-flex>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import { genAddress } from '@/assets/util/addressUtil.js'
import { vpubObject, xfp } from '@/assets/constants/userConstantFiles.js'
import { createPSBT } from '@/assets/util/psbtUtil.js'
import { downloadPSBT } from '@/assets/util/electronUtil.js'
import { updateTrans } from '@/assets/util/networkUtil.js'
// import { updatePSBT, getPSBT } from '@/assets/coldCard/genPSBT.js'
// import { downloadPSBT } from '@/assets/coldCard/downloadPSBT.js'
// import { uploadPSBT } from '@/assets/coldCard/uploadPSBT.js'
// import { combineCompletedTrans } from '@/assets/coldCard/combineAndBroadcast.js'
const R = require('ramda')
export default {
  data: () => ({
    receiveAddress: '',
    index: 2,
    hardwareSignedHex: '',
    m: 2
  }),
  methods: {
    async updatePSBT () {
      const PSBT = await createPSBT(this.index, this.m, vpubObject, xfp)
      const update = await updateTrans(PSBT, this.index)
      console.log(update)
    },
    async getAddress () {
      const vpubArray = R.values(vpubObject)
      const receiveAddress = await genAddress(this.index, vpubArray, this.m)
      this.receiveAddress = receiveAddress
    },
    async downloadPSBTTo () {
      const PSBT = await createPSBT(this.index, this.m, vpubObject, xfp)
      console.log(PSBT)
      await downloadPSBT(PSBT)
    }
    // async uploadPSBT () {
    //   const signedPSBT = await uploadPSBT()
    //   this.hardwareSignedHex = signedPSBT
    // },
    // async combine (trans1, trans2) {
    //   const trans = await combineCompletedTrans(trans1, trans2)
    //   console.log(trans)
    // }
  }
}
</script>
