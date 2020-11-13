<template>
    <v-layout align-center justify-center row fill-height>
      <mainWalletComp
      v-bind:goal='goal'
      v-bind:goalInfo='goalInfo'
      v-on:goalCompleted='goalCompleted'/>
    </v-layout>
</template>

<script>
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
export default {
  components: {
    mainWalletComp
  },
  data: () => ({
    goal: 'getStatus',
    goalInfo: {}
  }),
  methods: {
    goalCompleted: function (goal, info) {
      console.log(goal, info)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
