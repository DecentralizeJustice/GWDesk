<template>
  <v-stepper :value='currentStep'>
      <v-stepper-header>
        <v-stepper-step step="1" :complete='complete(0)' >Hardware</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete='complete(1)' >Confirm</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3" :complete='complete(2)'>Terms</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4" :complete='complete(3)'>Pay</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="5" :complete='complete(4)'>Setup 1st Device</v-stepper-step>
    </v-stepper-header>
    </v-stepper>
</template>

<script>
export default {
  name: 'Stepper',
  props: ['currentSection'],
  computed: {
    currentStep () {
      const currentStepString = (this.currentSection + 1).toString()
      return currentStepString
    }
  },
  methods: {
    complete (step) {
      const statement = (step < this.currentSection)
      return statement
    }
  }
}
</script>
