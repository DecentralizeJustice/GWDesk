<template>
  <v-flex xs12>
    <v-card-text>
      <h1 class="title">Send To:</h1>
      <v-col cols="10" class="mx-auto">
          <v-text-field
          v-model='proposedAddress'
            :label="addressIndex(addressArray.length)"
          ></v-text-field>
          <v-btn
            color="green"
            :disabled='addressArray.length>=maxNumberAddress'
            v-on:click="addToArray (proposedAddress)">
            <v-icon>mdi-plus-circle</v-icon>
              &#8205; Add
          </v-btn>
      </v-col>
    </v-card-text>
    <v-row class="mx-auto" v-if='addressArray.length!==0'>
      <v-col align-content='center' cols='9'>
        <v-card-text>
          <h2 class="">Addresses:</h2>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      class="mb-5"
      v-for="(item,index) in addressArray" :key="index"
    >
      <v-col cols="10" class="mx-auto">
        <v-row align-content='center'>
          <v-col
            cols="8"
            align-self='center'
          >
          <v-hover v-slot:default="{ hover }">
          <v-card
            class='light-blue darken-4'
            :elevation="hover ? 12 : 2"
          >
            <v-card-text class="subtitle-1 white--text">
              {{index+1}}. {{item}}
            </v-card-text>
          </v-card>
          </v-hover>
          </v-col>
          <v-col
            cols="3"
            align-self='center'
          >
          <v-btn
            color="red"
            v-on:click="removeFromArray (index)"
            class="">
            <v-icon>mdi-minus-circle</v-icon>
              &#8205; Remove
          </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-flex>
</template>
<script>
import validate from 'bitcoin-address-validation'
const R = require('ramda')
export default {
  props: ['transaction'],
  data: () => ({
    proposedAddress: 'mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB',
    maxNumberAddress: 2
  }),
  methods: {
    addToArray (address) {
      const newAddressArray = this.addressArray
      if (R.includes(address, this.addressArray) || !validate(address)) {
        this.proposedAddress = ''
        return
      }
      newAddressArray.push(address)
      this.proposedAddress = ''
      this.$emit('updateAddressArray', newAddressArray)
    },
    removeFromArray (index) {
      const newAddressArray = this.addressArray
      newAddressArray.splice(index, 1)
      this.$emit('updateAddressArray', newAddressArray)
    },
    addressIndex (index) {
      const ordinal = this.ordinalSuffixOf(index + 1)
      const label = ordinal + ' Address'
      return label
    },
    ordinalSuffixOf (index) {
      const j = index % 10
      const k = index % 100
      if (j === 1 && k !== 11) {
        return index + 'st'
      }
      if (j === 2 && k !== 12) {
        return index + 'nd'
      }
      if (j === 3 && k !== 13) {
        return index + 'rd'
      }
      return index + 'th'
    }
  },
  computed: {
    addressArray: function () {
      return this.transaction.addressArray
    }
  },
  mounted: function () {
    // this.addToArray()
  }
}
</script>
