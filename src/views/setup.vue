<template>
  <component
  v-bind:is="currentMain"
  v-on:next="updateStep"/>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('stageInfo')
export default {
  data: () => ({
    componentList: {
      pay: 'upToPay',
      hardwareSetup: 'walletSetup',
      walletTour: 'walletTour'
    }
  }),
  components: {
  },
  computed: {
    currentMain () {
      const currentStage = this.currentStage
      const componentName = this.componentList[currentStage]
      return () => import(`@/components/setup/${componentName}/${componentName}.vue`)
    },
    ...mapGetters({
      currentStage: 'currentStage'
    })
  },
  methods: {
    updateStep (number) {
      this.currentSection = number
    }
  }
}
</script>
