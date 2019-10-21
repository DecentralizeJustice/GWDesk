<template>

      <v-flex xs8 offset-xs2>
        <v-card-text>
          <h1 class="mb-5 headline">Terms</h1>

          <h2 class="title">Months of Membership:</h2>
          <v-select
          class="my-2 mb-5"
          :items="monthDropdown"
          label="Months"
          v-model="months"
          />

          <h2 class="title">BTC Stored:</h2>
            <v-col md="12" class="mb-5">
             <v-text-field
               label="Amount"
               value="10"
               suffix="BTC"
               type="number"
               v-model="amount"
             ></v-text-field>
            </v-col>

          <h2 class="mb-5 title">Membership Cost:</h2>
          <h2>{{this.cost}} BTC</h2>
        </v-card-text>
        </v-flex>

</template>

<script>
export default {
  data: () => ({
    maxMonths: 12,
    months: 1,
    amount: 1,
    perMonthPercentage: 0.005
  }),
  props: ['membershipOptions'],
  computed: {
    monthDropdown: function () {
      const options = []
      for (let i = 1; i < this.maxMonths + 1;
        i++) {
        options.push(i)
      }
      return options
    },
    cost: function () {
      return this.months * (this.amount * this.perMonthPercentage)
    }
  },
  watch: {
    cost: function (newCost, oldCost) {
      this.$emit('updateMembershipOptions',
        { months: this.months, amount: this.amount, cost: this.cost })
    }
  },
  created () {
    if (Object.keys(this.membershipOptions).length !== 0) {
      this.months = this.membershipOptions.months
      this.amount = this.membershipOptions.amount
    } else {
      this.$emit('updateMembershipOptions',
        { months: this.months, amount: this.amount, cost: this.cost })
    }
  }
}
</script>
