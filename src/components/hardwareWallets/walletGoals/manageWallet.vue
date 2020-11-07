<template>
  <v-card flat cols="12">
    <mainWalletComp
    v-if='gettingStatus'
    v-bind:goal='goal'
    v-bind:goalInfo='goalInfo'
    v-on:goalCompleted='goalCompleted'/>
      <v-row justify="space-around" v-if='!gettingStatus'>
        <v-col cols="6">
          <trezorT
          v-bind:walletInfo='walletInfo'
          v-bind:status='status'/>
        </v-col>
      </v-row>
  </v-card>
</template>

<script>
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
import trezorT from '@/components/hardwareWallets/wallets/trezorT.vue'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
    trezorT,
    mainWalletComp
  },
  data: () => ({
    gettingStatus: false,
    status: [],
    goal: 'getStatus'
  }),
  methods: {
    goalCompleted: function (goal, info) {
      if (goal === 'getStatus') {
        this.status = info.status
        this.gettingStatus = false
      }
    }
  },
  computed: {
  },
  async mounted () {
    this.gettingStatus = true
  }
}
</script>
