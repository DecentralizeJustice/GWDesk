<template>
  <home
  v-bind:amountUSD='amountUSD'
  v-bind:goalEpochTime='goalEpochTime'
  v-bind:crypto='crypto'
  v-bind:userIdInfo='userIdInfo'
  v-on:readyToStart='readyToStart'
  v-on:updateAddress='updateAddress'
  v-on:updateUserIDInfo='updateUserIDInfo'
  />
</template>

<script>
import home from '@/components/gameShow/home.vue'
export default {
  components: {
    home
  },
  data: () => ({
    amountUSD: '30',
    stage: 0,
    goalEpochTime: 1607652000000,
    crypto: 'Monero (XMR)',
    userIdInfo: {
      address: '',
      adjective: '',
      emoji: ''
    }
  }),
  computed: {
  },
  methods: {
    readyToStart: function () {
      console.log('goooo')
    },
    updateAddress: function (address) {
      this.userIdInfo.address = address
    },
    updateUserIDInfo: function (infoObject) {
      this.userIdInfo.emoji = infoObject.emoji
      this.userIdInfo.adjective = infoObject.adjective
    }
  },
  async mounted () {
  }
}
</script>
