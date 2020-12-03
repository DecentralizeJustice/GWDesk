<template>
  <div>
    <mainWalletComp
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'
    v-if='showTool && !refreshNeeded'/>
    <v-row justify="center" v-if='!showTool && !refreshNeeded' >
      <v-col class="grey" cols='8'>
        <v-col cols="12">
          <v-img
            :src="walletPhoto"
          ></v-img>
        </v-col>
        <v-col
          cols="8"
        >
          <v-btn
            color="red"
            v-on:click="wipe()"
          >
            Wipe
          </v-btn>
        </v-col>
    </v-col>
    </v-row>
    <v-row
      align="center"
      justify="space-around"
      class="mt-5"
      v-if='refreshNeeded'
    >
      <v-alert
          dark
          type="error"
          border="left"
        >
        Please Refresh Page.
      </v-alert>
    </v-row>
  </div>
</template>

<script>
import image1 from '@/assets/photos/trezormodelt.jpg'
export default {
  props: ['walletInfo', 'status'],
  components: {
  },
  data: () => ({
    currentWalletVersion: '',
    goal: 'checkIfUpdateNeeded',
    goalInfo: '',
    refreshNeeded: false,
    showTool: true
  }),
  methods: {
    goalCompleted: function (goal, info) {
      if (goal === 'checkIfUpdateNeeded') {
        if (info.walletNeedsUpdate) {
          this.goal = 'installFirmware'
        } else {
          this.showTool = false
        }
      }
      if (goal === 'installFirmware') {
        if (info.installSuccess) {
          this.refreshNeeded = true
          this.showTool = false
        }
      }
      if (goal === 'wipeSetupInfo') {
        if (!info.wipeDone) {
          console.log(info)
        }
        this.refreshNeeded = true
      }
    },
    wipe: function () {
      this.goal = 'wipeSetupInfo'
      this.showTool = true
    }
  },
  computed: {
    walletPhoto: function () {
      return image1
    }

  },
  async mounted () {
  }
}
</script>
