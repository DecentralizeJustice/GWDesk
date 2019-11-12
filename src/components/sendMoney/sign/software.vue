<template>
  <v-dialog v-model="dialog" persistent max-width="75%">
    <template v-slot:activator="{ on }">
      <v-card-actions class="mb-5 justify-center">
        <v-btn v-on="on">Sign</v-btn>
      </v-card-actions>
    </template>
    <v-card>
      <v-card-title class="headline justify-center">Sign With Software Wallet</v-card-title>
      <v-row no-gutters>
        <v-col cols='4'
        offset="1">
          <v-card
            color="primary"
            class="justify-center align-center"
          >
          <v-card-title class="justify-center">
            <v-icon x-large color="black" class="justify-center align-center">
            mdi-cloud-upload
            </v-icon>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn color="black"
             @click="updatePSBT()">Submit to Sign</v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols='4'
        offset="1">
          <v-card
            color="primary"
            class="justify-center align-center"
          >
          <v-card-title class="justify-center">
            <v-icon x-large color="black" class="justify-center align-center">
            mdi-cloud-download
            </v-icon>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-btn color="black"
             @click="getPSBT()">Check for Signatures</v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
    </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { updateTrans, getTrans } from '@/assets/util/networkUtil.js'
export default {
  name: 'softwareSign',
  props: ['plainPsbt', 'transctionData'],
  data: () => ({
    dialog: false,
    signedPSBT: ''
  }),
  computed: {
  },
  methods: {
    updatePSBT: async function () {
      const result = await updateTrans(this.plainPsbt)
      console.log(result)
    },
    getPSBT: async function functionName () {
      const result = await getTrans()
      const trans = result.blob.trans
      if (trans !== this.plainPsbt) {
        this.signedPSBT = trans
        console.log('Signed')
        this.$emit('addsigned', 'web', trans)
        return
      }
      console.log('Not Signed')
    }

  },
  async created () {
  }
}
</script>
