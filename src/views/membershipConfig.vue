<template>
  <component
    v-bind:is="currentMain"
    v-on:change="updateStep">
  </component>
</template>

<script>
export default {
  data: () => ({
    componentList: ['landingPage.vue', 'checkout/checkoutMain.vue'],
    currentComponent: 1
  }),
  methods: {
    updateStep (stepUpdate) {
      if (stepUpdate === 'landingPage') {
        this.currentComponent = 0
      }
      if (stepUpdate === 'checkoutMain') {
        this.currentComponent = 1
      }
    }
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[this.currentComponent]
      return () => import(`@/components/membershipConfig/${componentName}`)
    }
  }
}
</script>
