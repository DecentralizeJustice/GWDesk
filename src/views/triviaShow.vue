<template>
  <div style="width:100%;">
    <v-row no-gutters align-content='center' justify='center'>
    <home
    v-if='!dialog'
    v-bind:userIdInfo='userIdInfo'
    v-bind:dev='dev'
    @readyToStart='readyToStart()'
    @showRules='showRulesFunc()'
    v-on:updateAddress='updateAddress'
    v-on:updateUserIDInfo='updateUserIDInfo'
    v-bind:genInfo='genGameInfo'
    v-bind:privateId='privateId'
    />
      </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
      overlay-color='#2A3B4D'
      width="80%"
      style="dialog"
    >

    <question
    v-bind:userIdInfo='userIdInfo'
    v-if='dialog && showGame'
    v-bind:questions='questions'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='mediaInfo'
    v-bind:dev='dev'
    v-bind:privateId='privateId'
    v-bind:genInfo='genGameInfo'
    v-on:exit="exitGame"
    style='overflow:hidden;'/>

    <rules v-if='dialog && showRules'
    v-on:exit='exitRules'/>

    </v-dialog>
  </div>
</template>

<script>
import home from '@/components/gameShow/home.vue'
import question from '@/components/gameShow/question.vue'
import gameInfo from '@/assets/gameShow/gameInfo.js'
import rules from '@/components/gameShow/rules.vue'
import { secretbox, randomBytes } from 'tweetnacl'
import {
  encodeBase64
} from 'tweetnacl-util'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'triviaShow',
  components: {
    home,
    question,
    rules
  },
  data: () => ({
    dev: false,
    encrypted: true,
    showGame: false,
    questions: {},
    mediaInfo: {},
    dialog: false,
    showRules: false,
    userIdInfo: {
      address: '',
      adjective: '',
      emoji: ''
    }
  }),
  computed: {
    ...mapState('gameInfo', [
      'gameInfo', 'privateId'
    ]),
    genGameInfo: function () {
      return gameInfo.default
    }
  },
  methods: {
    ...mapActions('gameInfo',
      ['updateInfo', 'updatePrivateId']
    ),
    setQuestions: async function () {
      if (this.encrypted) {
        const info = await import('../assets/gameShow/output/encryptedQuestions.json')
        this.questions = info.questions
        // return
      }
      // const info = await import('../assets/gameShow/files/questions.json')
      // this.questions = info.default
    },
    setMediaInfo: async function () {
      if (this.encrypted) {
        const mediaInfoJson = await import('../assets/gameShow/output/mediaInfo.json')
        const mediaInfo = mediaInfoJson.default
        await this.encryptedSetHv(mediaInfo)
        await this.encryptedSetIntro(mediaInfo, 'intro')
        await this.encryptedSetIntro(mediaInfo, 'outro')
        await this.encryptedQuestions(mediaInfo, parseInt(this.genGameInfo.numberOfQuestions))
        // return
      }
      // const info = await import('../assets/gameShow/files/mediaInfo.json')
      // await this.plainTextSetHV(info)
      // await this.plainTextSetIntro(info)
      // await this.plainTextSetOutro(info)
      // await this.plainTextQuestions(info, parseInt(this.genGameInfo.numberOfQuestions))
    },
    encryptedSetHv: async function (mediaInfo) {
      this.mediaInfo.hv = {}
      const audio = await import('../assets/gameShow/output/hvMediaAudio.json')
      this.mediaInfo.hv.audio = audio.default
      const imgArray = []
      for (var i = 0; i < mediaInfo.hv.img.length; i++) {
        const img = await import(`../assets/gameShow/output/hvMediaImg${i}.json`)
        imgArray.push(img.default)
      }
      this.mediaInfo.hv.imgs = imgArray
      this.mediaInfo.hv.slideTiming = mediaInfo.hv.slideTiming
    },
    encryptedSetIntro: async function (mediaInfo, type) {
      this.mediaInfo[type] = {}
      const audio = await import(`../assets/gameShow/output/${type}Audio.json`)
      this.mediaInfo[type].audio = audio.default
      const imgArray = []
      for (var i = 0; i < mediaInfo[type].img.length; i++) {
        const img = await import(`../assets/gameShow/output/${type}Img${i}.json`)
        imgArray.push(img.default)
      }
      this.mediaInfo[type].img = imgArray
      this.mediaInfo[type].slideTiming = mediaInfo[type].slideTiming
    },
    // plainTextSetHV: async function (info) {
    //   const introAudio = await import('../assets/gameShow' + info.default.hv.audio.substring(1))
    //   const hvImg = info.default.hv.img
    //   const imgArray = []
    //   for (var i = 0; i < hvImg.length; i++) {
    //     const audio = await import('../assets/gameShow' + info.default.hv.img[i].substring(1))
    //     imgArray.push(audio.default)
    //   }
    //   this.mediaInfo.hv = {}
    //   this.mediaInfo.hv.audio = introAudio.default
    //   this.mediaInfo.hv.imgs = imgArray
    //   this.mediaInfo.hv.slideTiming = info.hv.slideTiming
    // },
    // plainTextSetIntro: async function (info) {
    //   const introAudio = await import('../assets/gameShow' + info.default.intro.audio.substring(1))
    //   const introImg = info.default.intro.img
    //   const imgArray = []
    //   for (var i = 0; i < introImg.length; i++) {
    //     const img = await import('../assets/gameShow' + info.default.intro.img[i].substring(1))
    //     imgArray.push(img.default)
    //   }
    //   this.mediaInfo.intro = {}
    //   this.mediaInfo.intro.audio = introAudio.default
    //   this.mediaInfo.intro.img = imgArray
    //   this.mediaInfo.intro.slideTiming = info.intro.slideTiming
    // },
    encryptedQuestions: async function (info, numberOfQuestions) {
      for (var i = 1; i < numberOfQuestions + 1; i++) {
        const audio = await import(`../assets/gameShow/output/questionMediaAudio${i}.json`)
        const imgArray = []
        for (var y = 0; y < info[i].img.length; y++) {
          const img = await import(`../assets/gameShow/output/questionMediaImg${i}-${y}.json`)
          imgArray.push(img.default)
        }
        this.mediaInfo[i] = {}
        this.mediaInfo[i].audio = audio.default
        this.mediaInfo[i].imgs = imgArray
        this.mediaInfo[i].slideTiming = info[i].slideTiming
      }
    },
    // plainTextQuestions: async function (info, numberOfQuestions) {
    //   for (var i = 1; i < numberOfQuestions + 1; i++) {
    //     const audio = await import('../assets/gameShow' + info.default[i].audio.substring(1))
    //     const imgArray = []
    //     for (var y = 0; y < info.default[i].img.length; y++) {
    //       const img = await import('../assets/gameShow' + info.default[i].img[y].substring(1))
    //       imgArray.push(img.default)
    //     }
    //     this.mediaInfo[i] = {}
    //     this.mediaInfo[i].audio = audio.default
    //     this.mediaInfo[i].imgs = imgArray
    //     this.mediaInfo[i].slideTiming = info[i].slideTiming
    //   }
    // },
    // plainTextSetOutro: async function (info) {
    //   const outroAudio = await import('../assets/gameShow' + info.default.outro.audio.substring(1))
    //   const outroImg = info.default.outro.img
    //   const imgArray = []
    //   for (var i = 0; i < outroImg.length; i++) {
    //     const audio = await import('../assets/gameShow' + info.default.outro.img[i].substring(1))
    //     imgArray.push(audio.default)
    //   }
    //   this.mediaInfo.outro = {}
    //   this.mediaInfo.outro.audio = outroAudio.default
    //   this.mediaInfo.outro.img = imgArray
    //   this.mediaInfo.outro.slideTiming = info.outro.slideTiming
    // },
    setupInfo: function () {
      this.userIdInfo.address = this.gameInfo.address
      this.userIdInfo.adjective = this.gameInfo.adjective
      this.userIdInfo.emoji = this.gameInfo.emoji
    },
    exitGame: function () {
      this.dialog = false
      this.showGame = false
    },
    readyToStart: function () {
      this.showGame = true
      this.dialog = true
    },
    showRulesFunc: function () {
      this.showRules = true
      this.dialog = true
    },
    exitRules: function () {
      this.dialog = false
      this.showRules = false
    },
    updateAddress: function (address) {
      this.userIdInfo.address = address
      this.updateInfo({ address })
    },
    updateUserIDInfo: function (infoObject) {
      this.userIdInfo.emoji = infoObject.emoji
      this.userIdInfo.adjective = infoObject.adjective
      this.updateInfo({ emoji: infoObject.emoji, adjective: infoObject.adjective })
    },
    handlePrivateId: function () {
      if (this.privateId === '') {
        const generateKey = () => encodeBase64(randomBytes(secretbox.keyLength))
        const key = generateKey()
        this.updatePrivateId(key)
      }
    }
  },
  async beforeMount () {
    this.handlePrivateId()
    await this.setupInfo()
    await this.setQuestions()
    await this.setMediaInfo()
  }
}
</script>
