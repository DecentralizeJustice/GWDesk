<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-text>
              <h2>Settings</h2>
            </v-card-text>
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
import { createPSBT, combineCompletedTrans } from '@/assets/util/psbtUtil.js'
import { downloadPSBT, uploadPSBT } from '@/assets/util/electronUtil.js'
import { updateTrans, getTrans, broadcastTrans } from '@/assets/util/networkUtil.js'

const R = require('ramda')
export default {
  data: () => ({
    receiveAddress: '',
    index: 4,
    hardwareSignedHex: '',
    webSignedTrans: '',
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
    },
    async getWebSigned () {
      const signedBlob = await getTrans()
      this.webSignedTrans = signedBlob.blob.trans
      console.log(this.webSignedTrans)
    },
    async uploadPSBT () {
      const signedPSBT = await uploadPSBT()
      this.hardwareSignedHex = signedPSBT
      console.log(this.hardwareSignedHex)
    },
    async combine (trans1, trans2) {
      const trans = await combineCompletedTrans(trans1, trans2)
      const finalBraodcast = await broadcastTrans(trans)
      console.log(finalBraodcast)
    }
  }
}
</script>
