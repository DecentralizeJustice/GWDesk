<template>
  <v-card class="text-center flat" style="background-color: grey;">
    <walletTool
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'
    v-if='(checkingForUpdate || updateNeeded) && !refreshNeeded'/>
    <v-container v-if='!checkingForUpdate && !updateNeeded && !refreshNeeded'>
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
    <div v-if='refreshNeeded'>
      Please Refresh Page
    </div>
  </v-card>
</template>

<script>
import image1 from '@/assets/photos/trezormodelt.jpeg'
import walletTool from '@/components/hardwareWallets/mainWalletTool.vue'
export default {
  props: ['walletInfo', 'status'],
  components: {
    walletTool
  },
  data: () => ({
    currentWalletVersion: '',
    goal: 'checkIfUpdateNeeded',
    goalInfo: '',
    updateNeeded: true,
    checkingForUpdate: true,
    refreshNeeded: false
  }),
  methods: {
    goalCompleted: function (goal, info) {
      if (goal === 'checkIfUpdateNeeded') {
        this.checkingForUpdate = false
        if (info.walletNeedsUpdate) {
          this.goal = 'installFirmware'
        } else {
          this.updateNeeded = false
        }
      }
      if (goal === 'installFirmware') {
        if (info.installSuccess) {
          this.updateNeeded = false
          this.refreshNeeded = true
        }
      }
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
