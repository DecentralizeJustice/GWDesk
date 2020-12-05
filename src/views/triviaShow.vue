<template>
  <div style="width:100%;">
    <v-row no-gutters align-content='center' justify='center'>
    <home
    v-if='stage === 0'
    v-bind:amountUSD='amountUSD'
    v-bind:goalEpochTime='startEpochTime'
    v-bind:crypto='crypto'
    v-bind:userIdInfo='userIdInfo'
    v-bind:dev='dev'
    v-on:readyToStart='readyToStart'
    v-on:updateAddress='updateAddress'
    v-on:updateUserIDInfo='updateUserIDInfo'
    />
      </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
      width="75%"
    >
    <question
    v-bind:amountUSD='amountUSD'
    v-bind:dev='dev'
    v-bind:genInfo='genInfo'
    v-on:exit="dialog = false"/>
    </v-dialog>
  </div>
</template>

<script>
import home from '@/components/gameShow/home.vue'
import question from '@/components/gameShow/question.vue'
import genInfo from '@/assets/gameShow/gameShowGenInfo.json'
export default {
  components: {
    home,
    question
  },
  data: () => ({
    dev: false,
    dialog: false,
    amountUSD: '',
    stage: 0,
    startEpochTime: 0,
    crypto: '',
    userIdInfo: {
      address: '',
      adjective: '',
      emoji: ''
    }
  }),
  computed: {
    genInfo: function () {
      return genInfo
    }
  },
  methods: {
    readyToStart: function () {
      this.dialog = true
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
    this.amountUSD = genInfo.amountUSD
    this.startEpochTime = genInfo.startEpochTime * 1000
    this.crypto = genInfo.crypto
  }
}
</script>
