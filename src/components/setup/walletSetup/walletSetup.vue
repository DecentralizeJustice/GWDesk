<template>
  <v-container  fill-height text-xs-center fluid>
    <v-layout align-center justify-center row>
      <v-flex xs10 >
          <component
          v-bind:is="currentMain"
          v-on:next="updateStep"
          v-on:updateXpubInfo="updateXpubInfo"
          v-bind:xpubInfo='xpubInfo'/>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    componentList: [
      'first', 'hardwareInitial', 'getWalletInfo', 'initilizeMultisig'
    ],
    currentSection: 0,
    xpubInfo: ['', '', ''],
    configInfo: {}
  }),
  components: {
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[this.currentSection]
      return () => import(`@/components/setup/walletSetup/${componentName}.vue`)
    }
  },
  methods: {
    updateStep (number) {
      this.currentSection = number
    },
    updateXpubInfo (index, walletObject) {
      const newCardInfo = JSON.parse(JSON.stringify(this.xpubInfo))
      newCardInfo[index] = walletObject
      this.xpubInfo = newCardInfo
    }
  }
}
</script>
