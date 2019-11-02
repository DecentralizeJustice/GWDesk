<template>
  <v-container grid-list-md text-center fill-height text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11 >
        <v-card
          class="text-center"
        >
        <v-flex xs10 class="mx-auto mb-5">
          <stepper v-bind:currentSection="currentSection"/>
        </v-flex>

          <component
          v-bind:is="currentMain"
          v-bind:transaction="transaction"
          v-on:updateTransaction="updateTransaction"/>
          <v-divider/>

          <bottomNav v-on:change="updateStep"
            v-bind:currentSection="currentSection"
            v-bind:continueDisabled='continueDisabled'
          />
        </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import stepper from '@/components/sendMoney/stepper.vue'
import bottomNav from '@/components/sendMoney/bottomNav.vue'
export default {
  data: () => ({
    componentList: ['sendToAddresses', 'amount'],
    currentSection: 0,
    transaction: {
      addressArray: []
    }
  }),
  components: {
    stepper,
    bottomNav
  },
  computed: {
    continueDisabled () {
      switch (this.currentSection) {
        case 0:
          if (this.transaction.addressArray.length !== 0) {
            return false
          }
          break
      }
      return true
    },
    currentMain () {
      const componentName = this.componentList[this.currentSection]
      return () => import(`@/components/sendMoney/${componentName}.vue`)
    }
  },
  methods: {
    updateStep (stepUpdate) {
      if (stepUpdate === 'continue') {
        this.currentSection += 1
      }
      if (stepUpdate === 'back') {
        if (this.currentSection !== 0) {
          this.currentSection -= 1
        } else {
          this.$emit('change', 'landingPage')
        }
      }
    },
    updateTransaction (partToUpdate, updateValue) {
      switch (partToUpdate) {
        case 'addressArray':
          this.transaction.addressArray = updateValue
          break
      }
    }
  },
  created: function () {
  }
}
</script>
