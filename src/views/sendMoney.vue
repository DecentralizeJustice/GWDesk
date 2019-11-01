<template>
  <mainPart/>
</template>

<script>
import { genAddress } from '@/assets/util/addressUtil.js'
import { vpubObject, xfp } from '@/assets/constants/userConstantFiles.js'
import { createPSBT, combineCompletedTrans } from '@/assets/util/psbtUtil.js'
import { downloadPSBT, uploadPSBT } from '@/assets/util/electronUtil.js'
import { updateTrans, getTrans, broadcastTrans } from '@/assets/util/networkUtil.js'
import mainPart from '@/components/sendMoney/main.vue'
const R = require('ramda')
export default {
  components: {
    mainPart
  },
  data: () => ({
    receiveAddress: '',
    index: 4,
    hardwareSignedHex: '',
    webSignedTrans: '',
    volume: 10
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
