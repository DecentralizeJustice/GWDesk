<template>
  <v-container  fill-height text-xs-center fluid>
    <v-layout align-center justify-center row>
      <v-flex xs10 >
    <!--<v-layout align-center justify-center row fill-height>
      <v-flex xs12 >
        <v-card
          class="text-center"
        > -->
        <!-- <v-flex xs10 class="mx-auto mb-5">
          <stepper v-bind:currentSection="currentSection"/>
        </v-flex> -->

          <component
          v-bind:is="currentMain"
          v-on:next="updateStep"/>
          <!-- <v-divider/> -->

          <!-- <bottomNav v-on:change="updateStep"
            v-bind:currentSection="currentSection"
            v-bind:continueDisabled='continueDisabled'
          /> -->
        <!-- </v-card>-->
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import stepper from '@/components/sendMoney/stepper.vue'
import bottomNav from '@/components/sendMoney/bottomNav.vue'
export default {
  data: () => ({
    componentList: ['first', 'explainHardware', 'mnemonicStorage', 'HardwareSummary'],
    currentSection: 0,
    transaction: {
    }
  }),
  components: {
    stepper,
    bottomNav
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[this.currentSection]
      return () => import(`@/components/setup/${componentName}.vue`)
    }
  },
  methods: {
    updateStep (number) {
      this.currentSection = number
    }
  }
}
</script>
