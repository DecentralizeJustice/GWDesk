<template>
  <div>
    <div>
      <v-card-title class="headline justify-center">
        Open Ended Question
      </v-card-title>
      <v-divider/>
      <v-row align-content='center' justify='center'>
        <v-col class="" cols="6" >
      <div>
      <v-alert type="error" v-if='toolate'>
        Answered Too Late
      </v-alert>
      </div>
    </v-col>
      </v-row>

      <audiopPlayer
      class="ma-4"
      v-if='explanation && (!encrypted || password)'
      v-bind:audioMuted='audioMuted'
      v-bind:audioFiles='audioFiles'
      v-bind:encrypted='encrypted'
      v-bind:password='password'
      v-bind:mediaInfo='specificMediaInfo'
      />
      <v-row align-content='center' justify='center' v-show='!explanation'>
        <v-col class="" cols="10" >
          <v-card class="mx-auto" color='blue darken-4'
            >
        <v-card-text class="display-1 white--text">
        {{question}}
        </v-card-text>
        </v-card>
        </v-col>
        <v-col class="text-center" cols="8">
          <v-textarea
          class="text-left text-h6 font-weight-regular"
            v-model="answer"
            counter
            label="Max 100 Characters"
            color="grey"
            :rules="rules"
            auto-grow
          ></v-textarea>
          <v-btn
          :disabled='choiceLocked || textTooMuch'
            color="primary"
            class=""
            @click='submitChoice(answer)'
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters align-content='center' justify='center' class="mt-4">
        <v-col cols='6' class="mb-5">
        <div class="mb-3 text-h6" v-show='!explanation'>Time:</div>
        <div class="mb-3 text-h6" v-show='explanation'>Time To Next Question:</div>
          <v-progress-linear
            color="light-blue"
            height="10"
            :value="progress"
            striped
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { post, get } from '@/assets/util/axios.js'
import { secretbox } from 'tweetnacl'
import {
  encodeUTF8,
  decodeBase64
} from 'tweetnacl-util'
import audiopPlayer from '@/components/gameShow/localAudioEncrypt.vue'
export default {
  name: 'hv',
  props: [
    'genInfo', 'currentTime', 'audioMuted', 'mediaInfo',
    'encrypted', 'questions', 'userIdInfo', 'privateId', 'type'
  ],
  components: {
    audiopPlayer
  },
  data: () => ({
    toolate: false,
    rules: [v => v.length <= 100 || 'Max 100 characters'],
    choiceLocked: true,
    answer: '',
    selectedItem: undefined,
    passwordInfo: {},
    explanation: false,
    progress: 0,
    question: '',
    submittedTime: 30000000000000000000
  }),
  computed: {
    specificMediaInfo: function () {
      return this.mediaInfo.hv
    },
    textTooMuch: function () {
      return (this.answer.length > 100)
    },
    audioFiles: function () {
      const question = this.mediaInfo.hv
      return { audio: question.audio, imgFiles: question.imgs }
    },
    questionStartTime: function () {
      return (parseInt(this.genInfo.intro.length) * 1000) +
        (parseInt(this.genInfo.startEpochTime) * 1000)
    },
    timetoAnswer: function () {
      return parseInt(this.genInfo.humanVerificationTimeToAnswer) * 1000
    },
    explanationTime: function () {
      return (parseInt(this.genInfo.humanVerificationTime) * 1000) - this.timetoAnswer
    },
    password: function () {
      if (this.passwordInfo.hv === undefined) {
        return false
      }
      if (this.passwordInfo.hv !== undefined) {
        return this.passwordInfo.hv
      }
      return false
    }
  },
  methods: {
    checkIfCorrect: function () {
      const startTime = this.questionStartTime
      const timetoAnswer = this.timetoAnswer
      const submitByTime = startTime + timetoAnswer
      if (this.submittedTime > submitByTime) {
        console.log('too late')
        this.toolate = true
        this.$emit('eliminated')
        return
      }
      console.log('submitted on time')
    },
    submitChoice: function (choice) {
      this.submitAnswer(choice)
      this.choiceLocked = true
    },
    submitAnswer: async function (choice) {
      const data = {
        address: this.userIdInfo[this.type],
        emoji: this.userIdInfo.emoji,
        adjective: this.userIdInfo.adjective,
        answer: choice,
        question: '0',
        privateId: this.privateId
      }
      const url = this.genInfo.postApi
      const result = await post(data, url)
      this.submittedTime = parseInt(result.data.time)
    },
    decryptFile: function (file, key) {
      const decrypted = this.decrypt(file, key)
      return decrypted.file
    },
    decrypt: function (messageWithNonce, key) {
      const keyUint8Array = decodeBase64(key)
      const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce)
      const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength)
      const message = messageWithNonceAsUint8Array.slice(
        secretbox.nonceLength,
        messageWithNonce.length
      )
      const decrypted = secretbox.open(message, nonce, keyUint8Array)
      if (!decrypted) {
        throw new Error('Could not decrypt message')
      }
      const base64DecryptedMessage = encodeUTF8(decrypted)
      return JSON.parse(base64DecryptedMessage)
    },
    getPassword: async function () {
      const url = this.genInfo.getApi
      const result = await get(url)
      function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      this.passwordInfo = result.data.info
      const info = result.data.info
      const waitTime = parseFloat(this.genInfo.waitTime) * 1000
      const correctQuestionReady = !(info.hv === undefined)
      this.setQuestion()
      if (!correctQuestionReady) {
        console.log('waiting')
        await sleep(waitTime)
        this.getPassword()
        return
      }
      this.choiceLocked = false
    },
    setQuestion: function () {
      if (this.encrypted) {
        if (this.passwordInfo.hv === undefined) {
          this.question = 'Loading Question'
          return
        }
        const decrypted = this.decryptFile(this.questions.hv, this.passwordInfo.hv)
        const parsed = JSON.parse(decrypted)
        this.question = parsed
        return
      }
      this.question = this.questions.hv.question
    }
  },
  watch: {
    explanation: async function () {
      this.checkIfCorrect()
    },
    currentTime: async function () {
      if (this.currentTime > this.questionStartTime + this.timetoAnswer) {
        this.explanation = true
        const topFract = this.questionStartTime + this.timetoAnswer - this.currentTime + this.explanationTime
        const bottomFract = this.explanationTime
        this.progress = 100 - ((topFract / bottomFract) * 100)
        return
      }
      const topFract = this.questionStartTime - this.currentTime + this.timetoAnswer
      const bottomFract = this.timetoAnswer
      this.progress = 100 - ((topFract / bottomFract) * 100)
    },
    passwordInfo: async function () {
      this.setQuestion()
    }
  },
  async created () {
    if (this.encrypted) {
      await this.getPassword()
    }
    this.setQuestion()
  }
}
</script>
