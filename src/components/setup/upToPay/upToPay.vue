<template>
  <v-container  fill-height text-xs-center fluid>
    <v-layout align-center justify-center row>
      <v-flex xs10 >
          <component
          v-bind:is="currentMain"
          v-on:next="updateStep"/>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    componentList: [
      'first', 'explainHardware', 'mnemonicStorage', 'hardwareSummary', 'membershipDetails',
      'pay'
    ],
    currentSection: 0,
    transaction: {
    }
  }),
  components: {
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[this.currentSection]
      return () => import(`@/components/setup/upToPay/${componentName}.vue`)
    }
  },
  methods: {
    updateStep (number) {
      this.currentSection = number
    }
  }
}
</script>
