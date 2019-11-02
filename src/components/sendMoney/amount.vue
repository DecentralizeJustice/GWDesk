<template>

      <v-flex xs8 offset-xs2>
        <v-slider
          v-model="volume"
          append-icon="mdi-turtle"
          prepend-icon="mdi-rabbit"
          label="Time"
          thumb-label
        ></v-slider>
        </v-flex>

</template>

<script>
import { getTransactionSize } from '@/assets/util/transactionUtil/transactionUtil.js'
import { m, vpubObject } from '@/assets/constants/userConstantFiles.js'
export default {
  props: ['transaction'],
  data: () => ({
    volume: 20
  }),
  computed: {
    addressArray: function () {
      return this.transaction.addressArray
    }
  },
  async mounted () {
    const musigTotal = Object.keys(vpubObject).length
    const musigNeeded = m
    const inputNumber = 1
    console.log(getTransactionSize(this.addressArray, musigNeeded, musigTotal, inputNumber))
  }
}
</script>
