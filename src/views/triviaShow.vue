<template>
  <div style="width:100%;">
    <v-row no-gutters align-content='center' justify='center'>
    <home
    v-if='!dialog'
    v-bind:userIdInfo='userIdInfo'
    v-bind:dev='dev'
    @readyToStart='readyToStart($event)'
    v-on:updateAddress='updateAddress'
    v-on:updateUserIDInfo='updateUserIDInfo'
    v-bind:genInfo='genGameInfo'
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
    v-bind:questions='questions'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='mediaInfo'
    v-bind:dev='dev'
    v-bind:genInfo='genGameInfo'
    v-on:exit="exitGame"/>
    </v-dialog>
  </div>
</template>

<script>
import home from '@/components/gameShow/home.vue'
import question from '@/components/gameShow/question.vue'
import gameInfo from '@/assets/gameShow/gameInfo.js'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    home,
    question
  },
  data: () => ({
    dev: false,
    encrypted: true,
    questions: {},
    mediaInfo: {},
    dialog: false,
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
    genGameInfo: function () {
      return gameInfo.default
    }
  },
  methods: {
    ...mapActions('gameInfo',
      ['updateInfo']
    ),
    setQuestions: async function () {
      if (this.encrypted) {
      }
      const info = await import('../assets/gameShow/files/questions.json')
      this.questions = info.default
    },
    setMediaInfo: async function () {
      if (this.encrypted) {
        const mediaInfoJson = await import('../assets/gameShow/output/mediaInfo.json')
        const mediaInfo = mediaInfoJson.default
        await this.encryptedSetIntro(mediaInfo)
      }
      // const info = await import('../assets/gameShow/files/mediaInfo.json')
      // await this.plainTextSetIntro(info)
      // await this.plainTextSetOutro(info)
      // await this.plainTextQuestions(info, parseInt(this.genGameInfo.numberOfQuestions))
    },
    encryptedSetIntro: async function (mediaInfo) {
      this.mediaInfo.intro = {}
      const audio = await import('../assets/gameShow/output/introAudio.json')
      this.mediaInfo.intro.audio = audio.default
      const imgArray = []
      for (var i = 0; i < mediaInfo.intro.img.length; i++) {
        const img = await import(`../assets/gameShow/output/introImg${i}.json`)
        imgArray.push(img.default)
      }
      this.mediaInfo.intro.img = imgArray
    },
    plainTextSetIntro: async function (info) {
      const introAudio = await import('../assets/gameShow' + info.default.intro.audio.substring(1))
      const introImg = info.default.intro.img
      const imgArray = []
      for (var i = 0; i < introImg.length; i++) {
        const audio = await import('../assets/gameShow' + info.default.intro.img[i].substring(1))
        imgArray.push(audio.default)
      }
      this.mediaInfo.intro = {}
      this.mediaInfo.intro.audio = introAudio.default
      this.mediaInfo.intro.img = imgArray
    },
    plainTextQuestions: async function (info, numberOfQuestions) {
      for (var i = 1; i < numberOfQuestions + 1; i++) {
        const audio = await import('../assets/gameShow' + info.default[i].audio.substring(1))
        const imgArray = []
        for (var y = 0; y < info.default[i].img.length; y++) {
          const img = await import('../assets/gameShow' + info.default[i].img[y].substring(1))
          imgArray.push(img.default)
        }
        this.mediaInfo[i] = {}
        this.mediaInfo[i].audio = audio.default
        this.mediaInfo[i].imgs = imgArray
      }
    },
    plainTextSetOutro: async function (info) {
      const outroAudio = await import('../assets/gameShow' + info.default.outro.audio.substring(1))
      const outroImg = info.default.outro.img
      const imgArray = []
      for (var i = 0; i < outroImg.length; i++) {
        const audio = await import('../assets/gameShow' + info.default.outro.img[i].substring(1))
        imgArray.push(audio.default)
      }
      this.mediaInfo.outro = {}
      this.mediaInfo.outro.audio = outroAudio.default
      this.mediaInfo.outro.img = imgArray
    },
    setupInfo: function () {
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
    // await this.setQuestions()
    await this.setMediaInfo()
  }
}
</script>
