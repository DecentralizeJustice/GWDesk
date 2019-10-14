<template>
  <v-container grid-list-md text-center fill-height text-xs-center>
    <v-layout align-start justify-center row fill-height>
      <v-flex xs10 >
        <stepper class="mt-5" v-bind:currentSection="currentSection"/>
      </v-flex>
      <v-flex xs8>
        <v-card
          class="mx-auto"
        >

          <component v-bind:hardwareOptions="planOptions"
          v-bind:is="currentMain"
          v-on:updatePlanOptions="updateHardware"
          v-on:updateMembershipOptions="updateMembershipOptions"
          v-bind:hardwareAdvancedOption='hardwareAdvancedOption'
          v-bind:membershipOptions='membershipOptions'>
          </component>

          <v-divider></v-divider>

          <bottomNav v-on:change="updateStep"
          v-on:changeAdvancedOptions=
          "hardwareAdvancedOption = !hardwareAdvancedOption"
          v-bind:currentSection="currentSection"
          v-bind:continueDisabled='continueDisabled'/>
        </v-card>
    </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import stepper from '@/components/membershipConfig/checkout/stepper.vue'
import bottomNav from '@/components/membershipConfig/checkout/bottomNav.vue'
export default {
  data: () => ({
    componentList: ['hardware', 'membership', 'confirm', 'pay'],
    currentSection: 0,
    planOptions: {},
    membershipOptions: {},
    hardwareAdvancedOption: false
  }),
  components: {
    stepper,
    bottomNav
  },
  computed: {
    continueDisabled () {
      switch (this.currentSection) {
        case 0:
          if (Object.keys(this.planOptions).length !== 0) {
            return false
          }
          break
        case 1:
          if (Object.keys(this.membershipOptions).length !== 0) {
            return false
          }
          break
        case 2:
          return false
        default:
          return true
      }
      return true
    },
    currentMain () {
      const componentName = this.componentList[this.currentSection]
      return () => import(`@/components/membershipConfig/checkout/${componentName}.vue`)
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
    updateHardwareAdvancedOption () {
      if (Object.keys(this.planOptions).length !== 0) {
        this.hardwareAdvancedOption = this.planOptions.hardwareAdvancedOption
      }
    },
    updateMembershipOptions (newMembershipOptions) {
      this.membershipOptions = newMembershipOptions
    },
    updateHardware (newHardwareOptions) {
      this.planOptions = newHardwareOptions
      this.updateHardwareAdvancedOption()
    }
  },
  created: function () {
    this.updateHardwareAdvancedOption()
  }
}
</script>
