<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
        <mainWalletComp
        v-if='true'
        v-bind:goal='goal'
        v-bind:goalInfo='goalInfo'
        v-on:goalCompleted='goalCompleted'/>
    </v-flex>
    </v-layout>
</template>

<script>
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
export default {
  components: {
    mainWalletComp
  },
  data: () => ({
    status: '',
    goal: 'getStatus',
    goalInfo: {}
  }),
  methods: {
    goalCompleted: function (goal, info) {
      if (goal === 'getStatus') {
        this.status = info.status
      } else {
        this.updateStatus()
      }
    },
    walletSetup: async function () {
      this.$emit('hwWalletSetup')
    },
    updateStatus: function () {
      this.goal = 'getStatus'
    },
    nextStep: function () {
      const status = this.status[0]
      if (status === 0) {
        this.goal = 'installFirmware'
      }
      if (status === 1) {
        this.goal = 'initialize'
      }
      if (status === 2) {
        this.goal = 'backup'
      }
      if (status === 3) {
        this.walletSetup()
      }
      if (status === 4) {
        console.log('backup failed')
      }
    }
  },
  computed: {
  },
  watch: {
    status: function (val) {
      this.nextStep()
    }
  },
  mounted () {
    this.goal = 'getStatus'
  }
}
</script>
