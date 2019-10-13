<template>
  <component
  v-bind:is="currentMain">
  </component>
</template>

<script>
export default {
  data: () => ({
    componentList: ['landingPage.vue', 'checkout/checkoutMain.vue']
  }),
  methods: {
    state () {
      console.log(this.$store.state)
    },
    hit () {
      this.$store.commit('increment')
    }
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[1]
      return () => import(`@/components/membershipConfig/${componentName}`)
    }
  }
}
</script>
