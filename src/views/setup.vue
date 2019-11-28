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
    componentList: [
      'upToPay'
    ],
    currentSection: 0
  }),
  components: {
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[this.currentSection]
      return () => import(`@/components/setup/upToPay/${componentName}.vue`)
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
