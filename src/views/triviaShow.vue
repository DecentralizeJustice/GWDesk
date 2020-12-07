<template>
  <div style="width:100%;">
    <v-row no-gutters align-content='center' justify='center'>
    <home
    v-if='!dialog'
    v-bind:amountUSD='amountUSD'
    v-bind:goalEpochTime='startEpochTime'
    v-bind:crypto='crypto'
    v-bind:userIdInfo='userIdInfo'
    v-bind:dev='dev'
    @readyToStart='readyToStart($event)'
    v-on:updateAddress='updateAddress'
    v-on:updateUserIDInfo='updateUserIDInfo'
    />
      </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
      overlay-color='#2A3B4D'
      width="75%"
      style="dialog"
    >
    <question
    v-if='dialog'
    v-bind:amountUSD='amountUSD'
    v-bind:dev='dev'
    v-bind:genInfo='genInfo'
    v-on:exit="exitGame"/>
    </v-dialog>
  </div>
</template>

<script>
import home from '@/components/gameShow/home.vue'
import question from '@/components/gameShow/question.vue'
import genInfo from '@/assets/gameShow/gameShowGenInfo.json'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    home,
    question
  },
  data: () => ({
    dev: false,
    dialog: false,
    amountUSD: '',
    startEpochTime: 0,
    crypto: '',
    userIdInfo: {
      address: '',
      adjective: '',
      emoji: ''
    }
  }),
  computed: {
    ...mapState('gameInfo', [
      'gameInfo'
    ]),
    genInfo: function () {
      return genInfo
    }
  },
  methods: {
    ...mapActions('gameInfo',
      ['updateInfo']
    ),
    setupInfo: function () {
      this.amountUSD = genInfo.amountUSD
      this.startEpochTime = genInfo.startEpochTime * 1000
      this.crypto = genInfo.crypto
      this.userIdInfo.address = this.gameInfo.address
      this.userIdInfo.adjective = this.gameInfo.adjective
      this.userIdInfo.emoji = this.gameInfo.emoji
    },
    exitGame: function () {
      this.dialog = false
      this.key += 1
    },
    readyToStart: function () {
      this.show = true
      this.dialog = true
    },
    updateAddress: function (address) {
      this.userIdInfo.address = address
      this.updateInfo({ address })
    },
    updateUserIDInfo: function (infoObject) {
      this.userIdInfo.emoji = infoObject.emoji
      this.userIdInfo.adjective = infoObject.adjective
      this.updateInfo({ emoji: infoObject.emoji, adjective: infoObject.adjective })
    }
  },
  async beforeMount () {
    await this.setupInfo()
  }
}
</script>
