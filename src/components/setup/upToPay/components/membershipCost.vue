<template>

  <v-card
  color='grey darken-2'
  >
  <v-card-title class="headline justify-center">
    Membership Cost Estimates
  </v-card-title>
  <v-divider></v-divider>
    <v-card-text>
      <v-col cols="3">
          <v-text-field
            label="Total BTC"
            placeholder=".1"
            type="number"
            v-model="totalBTC"
            suffix='BTC'
          ></v-text-field>
      </v-col>
      <v-col cols="3">
          Yearly Cost:
          {{yearCost}} BTC
      </v-col>
      <v-col cols="3">
          Monthly Cost:
          {{monthlyCost}} BTC
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
const BigNumber = require('bignumber.js')
export default {
  name: 'membershipCost',
  data () {
    return {
      totalBTC: 1,
      percentage: new BigNumber('.25')
    }
  },
  computed: {
    yearCost: function () {
      // `this` points to the vm instance
      return this.monthlyCost.multipliedBy(new BigNumber('12'))
    },
    monthlyCost: function () {
      // `this` points to the vm instance
      return new BigNumber(this.totalBTC).multipliedBy(this.percentage).shiftedBy(-2)
    }
  }
}
</script>
