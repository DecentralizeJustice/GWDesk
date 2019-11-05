<template>
  <v-dialog v-model="dialog" persistent max-width="75%">
    <template v-slot:activator="{ on }">
      <v-card-actions class="mb-5 justify-center">
        <v-btn v-on="on">Sign</v-btn>
      </v-card-actions>
    </template>
    <v-card>
      <v-card-title class="headline justify-center">Sign With Hardware Wallet</v-card-title>
      <v-row no-gutters>
        <v-col cols='4' offset="1">
          <v-card
            color="primary"
            class="justify-center align-center"
          >
          <v-card-title class="justify-center">
            <v-icon x-large color="black" class="justify-center align-center">
            mdi-folder-download
            </v-icon>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn color="black"
             @click="downloadPSBT()">Download Transaction</v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols='4' offset="1">
          <v-card
            color="primary"
            class="justify-center align-center"
          >
          <v-card-title class="justify-center">
            <v-icon x-large color="black" class="justify-center align-center">
            mdi-folder-upload
            </v-icon>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn color="black"
             @click="uploadPSBT()">Upload Transaction</v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
    </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" text @click="dialog = false">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { downloadPSBT, uploadPSBT } from '@/assets/util/electronUtil.js'
export default {
  name: 'hardwareSign',
  props: ['plainPsbt'],
  data: () => ({
    dialog: false,
    hardwareSignedHex: ''
  }),
  computed: {
  },
  methods: {
    async downloadPSBT () {
      const PSBT = this.plainPsbt
      await downloadPSBT(PSBT)
    },
    async uploadPSBT () {
      const signedPSBT = await uploadPSBT()
      this.hardwareSignedHex = signedPSBT
    }
  },
  async created () {
  }
}
</script>
