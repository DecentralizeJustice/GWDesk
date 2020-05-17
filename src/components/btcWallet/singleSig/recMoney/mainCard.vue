<template>
  <v-container>
      <component
      v-bind:is="currentMain"
      v-on:walletReady='walletReady'
      v-bind:walletInfo='walletInfo'/>
    </v-container>
</template>
<script>
import selectWallet from '@/components/btcWallet/singleSig/recMoney/selectWallet.vue'
import checkAddress from '@/components/btcWallet/singleSig/recMoney/checkAddress.vue'
const { clipboard } = require('electron')
export default {
  props: ['transactions'],
  data: () => ({
    step: 0,
    componentList: [selectWallet, checkAddress],
    walletInfo: {}
  }),
  methods: {
    copyToClipboard () {
      const text = this.address
      clipboard.writeText(text)
    },
    walletReady: function (walletInfo) {
      this.walletInfo = walletInfo
      this.step += 1
    }
  },
  computed: {
    currentMain () {
      const componentName = this.componentList[this.step]
      return componentName
    }
  },
  async mounted () {
    this.step = 0
  }
}
</script>
