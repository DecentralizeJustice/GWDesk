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
            v-on:click="addToArray (proposedAddress)">
            <v-icon>mdi-plus-circle</v-icon>
              &#8205; Add
          </v-btn>
      </v-col>
    </v-card-text>
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
export default {
  props: ['transaction'],
  data: () => ({
    proposedAddress: ''
  }),
  methods: {
    addToArray (address) {
      const newAddressArray = this.addressArray
      newAddressArray.push(address)
      this.proposedAddress = ''
      this.$emit('updateTransaction', { addressArray: newAddressArray })
    },
    removeFromArray (index) {
      const newAddressArray = this.addressArray
      newAddressArray.splice(index, 1)
      this.$emit('updateTransaction', { addressArray: newAddressArray })
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
      if (this.transaction.addressArray === undefined) {
        return []
      } else {
        return this.transaction.addressArray
      }
    }
  }
}
</script>
