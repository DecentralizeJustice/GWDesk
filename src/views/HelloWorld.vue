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
                <v-btn text color="primary">Upload and Broadcast Trans</v-btn>
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
export default {
  data: () => ({
    receiveAddress: '',
    index: 0,
    hardwareSignedHex: ''
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
    }
  }
}
</script>
