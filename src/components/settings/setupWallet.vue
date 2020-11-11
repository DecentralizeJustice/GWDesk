<template>
  <mainWalletComp
  v-if='true'
  v-bind:goal='goal'
  v-bind:goalInfo='goalInfo'
  v-on:goalCompleted='goalCompleted'/>
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
      // console.log(goal, info)
      if (goal === 'getStatus') {
        this.status = info.status
        this.nextStep()
        return
      }
      if (goal === 'backupFailed') {
        this.goal = 'wipeSetupInfo'
        return
      }
      if (goal === 'initialize' && info.needsToRestore) {
        this.goal = 'restore'
        return
      }
      this.goal = 'getStatus'
    },
    walletSetup: async function () {
      this.$emit('hwWalletSetup')
    },
    nextStep: function () {
      const status = this.status[0]
      if (status === 0) {
        this.goal = 'installFirmware'
        return
      }
      if (status === 1) {
        this.goal = 'initialize'
        return
      }
      if (status === 2) {
        this.goal = 'backup'
        return
      }
      if (status === 3) {
        this.walletSetup()
        return
      }
      if (status === 4) {
        this.goal = 'backupFailed'
        return
      }
      console.log('Unknown Next Step')
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
    this.goal = 'getStatus'
  }
}
</script>
