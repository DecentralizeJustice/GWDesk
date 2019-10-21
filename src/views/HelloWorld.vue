<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs8>
          <v-card >
            <v-card-text>
              <h2>{{receiveAddress}}</h2>
            </v-card-text>
            <v-card-actions class="text-xs-center">
              <v-flex class="text-xs-center">
                <v-btn text color="primary" v-on:click="getAddress()">Get Recieve Address</v-btn>
                <v-btn text color="primary" v-on:click="downloadPSBT()">Download PSBT File</v-btn>
                <v-btn text color="primary" v-on:click="getPBST()">Console PSBT Hex</v-btn>
                <v-btn text color="primary" v-on:click="uploadPSBT()">Upload Hardware Signed PBST</v-btn>
                <v-btn text color="primary" v-on:click="combine (hardwareSignedHex, softwareSignedHex)">
                  Combine and Broadcast Trans</v-btn>
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
import { genAddress } from '@/assets/coldCard/genAddress.js'
import { getPSBT } from '@/assets/coldCard/genPSBT.js'
import { downloadPSBT } from '@/assets/coldCard/downloadPSBT.js'
import { uploadPSBT } from '@/assets/coldCard/uploadPSBT.js'
import { combineCompletedTrans } from '@/assets/coldCard/combineAndBroadcast.js'
export default {
  data: () => ({
    receiveAddress: '',
    index: 0,
    hardwareSignedHex: '',
    softwareSignedHex: '70736274ff010055020000000172ac4e1d46f3878c151b2854885990b2d6d88385e30b1113fa4d6b07ed1f8c7c0100000000ffffffff01301b0f00000000001976a914344a0f48ca150ec2b903817660b9b68b13a6702688ac000000000001012b40420f0000000000220020e031125fc2f2de93eeb26fbd12dbb46a0752866c36c934e8486e3c41d8c1817622020272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa054830450221009e94c37e5929f63e2393dbc9843ffff06c62cf0348913d2200db75e2ed53c5af02204d470694651a30058e203d3c4403856413610cd542384ff8a9082f615a0e841c0101054752210272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa052102cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c00165452ae22060272d6aae282f3020622a07e9cc404247fde4357aac2458474c2968eef9083fa0518dffed0153000008001000080000000800200008000000000220602cec729df6b2504c8a3e7840b4deb829203612f1a34b6ea9a377e016f9c001654186c6816ce30000080010000800000008002000080000000000000'
  }),
  methods: {
    async getPBST () {
      const PSBT = await getPSBT(this.index)
      console.log(PSBT)
    },
    async getAddress () {
      const receiveAddress = await genAddress(this.index)
      this.receiveAddress = receiveAddress
    },
    async downloadPSBT () {
      const PSBT = await getPSBT(this.index)
      await downloadPSBT(PSBT)
    },
    async uploadPSBT () {
      const signedPSBT = await uploadPSBT()
      this.hardwareSignedHex = signedPSBT
    },
    async combine (trans1, trans2) {
      const trans = await combineCompletedTrans(trans1, trans2)
      console.log(trans)
    }
  }
}
</script>
