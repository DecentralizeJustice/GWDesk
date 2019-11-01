<template>
  <v-flex xs12>
    <v-card-text>
      <h1 class="title">Send To:</h1>
      <v-col cols="10" class="mx-auto">
          <v-text-field
          v-model='proposedAddress'
            label="1st Adress"
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
      v-for="n in 1"
      :key="n"
      no-gutters
      class="mb-5"
    >
      <v-col cols="9" class="mx-auto">
        <v-hover v-slot:default="{ hover }" v-for="item in addressArray" :key="item">
        <v-card
          :class="{ 'on-hover': hover }"
          class='light-blue darken-4'
          link
          :elevation="hover ? 12 : 2"
        >
          <v-card-text class="mt-4 subtitle-1 white--text">
            {{item}}
          </v-card-text>
        </v-card>
      </v-hover>
      </v-col>
    </v-row>

  </v-flex>
</template>
<script>
export default {
  props: ['addressArraym'],
  data: () => ({
    addressArray: [],
    proposedAddress: ''
  }),
  methods: {
    addToArray (address) {
      this.addressArray.push(address)
      this.proposedAddress = ''
    }
  }
}
</script>
