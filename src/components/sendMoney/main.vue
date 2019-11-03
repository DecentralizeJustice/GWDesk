<template>
  <v-container grid-list-md text-center fill-height text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 >
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
    componentList: ['sendToAddresses', 'amount', 'confirm'],
    currentSection: 0,
    transaction: {
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
          if (this.transaction.addressArray !== undefined) {
            return false
          }
          break
        case 1:
          if (this.transaction.addressArrayAmount !== undefined) {
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
    updateTransaction (updateValue) {
      this.transaction = updateValue
    }
  },
  created: function () {
  }
}
</script>
