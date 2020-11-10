<template>
  <v-card class="text-center flat" style="background-color: grey;">
    <walletTool
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'
    v-if='updateFirmware'/>
    <v-container v-if='!updateFirmware'>
      <v-row justify="center">
        <v-col cols="12">
          <v-img
            :src="walletPhoto"
          ></v-img>
        </v-col>
        <v-col
          cols="3"
        >
          <!-- <v-btn
            color="red"
            v-on:click="wipe()"
          >
            Wipe
          </v-btn> -->
          <v-btn
            color="orange"
            v-on:click="updateWallet()"
            v-if='updateNeeded'
          >
            Update Wallet
          </v-btn>
          <!-- <v-btn
            color="red"
            v-on:click="wipe()"
          >
            Update
          </v-btn> -->
        </v-col>
        <v-col
          cols="4"
        >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import image1 from '@/assets/photos/trezormodelt.jpeg'
import walletTool from '@/components/hardwareWallets/mainWalletTool.vue'
import {
  getVersionNumber
} from '@/assets/util/trezorCli/general.js'
import hwInfo from '@/assets/constants/hwConstants.js'
export default {
  props: ['walletInfo', 'status'],
  components: {
    walletTool
  },
  data: () => ({
    currentWalletVersion: '',
    goal: 'installFirmware',
    goalInfo: '',
    updateFirmware: false,
    updateNeeded: false
  }),
  methods: {
    getVersionNumber: async function () {
      const result = await getVersionNumber()
      return result
    },
    updateWallet: async function () {
      this.updateFirmware = true
    },
    goalCompleted: function (goal, info) {
      if (goal === 'installFirmware') {
        if (info.installSuccess) {
          this.updateFirmware = false
          return
        }
      }
      console.log(goal, info)
    }
  },
  computed: {
    mostRecentWalletVersion: function () {
      return hwInfo.hwWalletVersions.trezorT
    },
    walletPhoto: function () {
      return image1
    }

  },
  async mounted () {
    this.currentWalletVersion = await getVersionNumber()
    if (this.mostRecentWalletVersion !== this.currentWalletVersion) {
      this.updateNeeded = true
    }
  }
}
</script>
