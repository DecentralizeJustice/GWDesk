<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-alert v-if='hardwareWallets.length === 0'
          dense
          border="left"
          type="warning"
        >
          No Wallet Not Found
        </v-alert>
        <v-alert v-if='hardwareWallets.length > 1'
          dense
          border="left"
          type="warning"
        >
          Too Many Wallets Connected
        </v-alert>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-btn class='mx-auto'
        @click='getDevices' v-if='hardwareWallets.length !== 1'
        color='primary'>
          Look for Wallet
        </v-btn>
    </v-row>
    <v-row justify="space-around" v-if='hardwareWallets.length === 1'>
      <v-col >
        <component
        v-bind:is="correctComponent(hardwareWallets[0].model)"
        v-bind:walletInfo='hardwareWallets[0]'
        v-bind:goal='goal'
        v-bind:goalInfo='goalInfo'
        v-on:goalCompleted="goalCompleted"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  listDevices
} from '@/assets/util/hwi/general.js'
import extractXpub from '@/components/hardwareWallets/walletGoals/extractXpub.vue'
import getVersion from '@/components/hardwareWallets/walletGoals/getVersion.vue'
import getInfo from '@/components/hardwareWallets/walletGoals/getGenWalletInfo.vue'
import showAddress from '@/components/hardwareWallets/walletGoals/showAddress.vue'
import signTrans from '@/components/hardwareWallets/walletGoals/signTrans.vue'
import getStatus from '@/components/hardwareWallets/walletGoals/getStatus.vue'
import checkMasterFingerprint from '@/components/hardwareWallets/walletGoals/checkMasterFingerprint.vue'
import manageWallet from '@/components/hardwareWallets/walletGoals/manageWallet.vue'
import installFirmware from '@/components/hardwareWallets/walletGoals/installFirmware.vue'
import initialize from '@/components/hardwareWallets/walletGoals/initialize.vue'
export default {
  components: {
    extractXpub,
    getVersion,
    getInfo,
    showAddress,
    signTrans,
    getStatus,
    checkMasterFingerprint,
    installFirmware,
    initialize
  },
  props: ['goal', 'goalInfo', 'hardwareInfo'],
  data: () => ({
    hardwareWallets: []
  }),
  methods: {
    getDevices: async function () {
      const result = await listDevices()
      this.hardwareWallets = result
    },
    correctComponent: function () {
      if (this.goal === 'extractXpub') {
        return extractXpub
      }
      if (this.goal === 'getVersion') {
        return getVersion
      }
      if (this.goal === 'getInfo') {
        return getInfo
      }
      if (this.goal === 'showAddress') {
        return showAddress
      }
      if (this.goal === 'signTrans') {
        return signTrans
      }
      if (this.goal === 'getStatus') {
        return getStatus
      }
      if (this.goal === 'checkFingerPrint') {
        return checkMasterFingerprint
      }
      if (this.goal === 'manageWallet') {
        return manageWallet
      }
      if (this.goal === 'installFirmware') {
        return installFirmware
      }
      if (this.goal === 'initialize') {
        return initialize
      }
      console.log('Unknown Goal')
    },
    goalCompleted: function (info) {
      this.$emit('goalCompleted', this.goal, info)
    }
  },
  computed: {
  },
  mounted () {
    if (this.hardwareInfo) {
      this.hardwareWallets = this.hardwareInfo
    }
    this.getDevices()
  }
}
</script>
