<template>
  <div>
      <v-card-title class="headline justify-center">
      Question #{{questionNumber}}
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
      v-if='explanation && (!encrypted || password )'
      v-bind:audioMuted='audioMuted'
      v-bind:audioFiles='audioFiles'
      v-bind:encrypted='encrypted'
      v-bind:password='password'
      v-bind:mediaInfo='specificMediaInfo'
      />
      <v-row align-content='center' justify='center' v-show='!explanation'>
        <gameMusic v-bind:audioMuted='audioMuted'
        v-if='!explanation'/>
        <v-col class="" cols="10" >
          <v-card class="mx-auto" color='blue darken-4'
            >
        <v-card-text class="display-1 white--text">
        {{question}}
        </v-card-text>
        </v-card>
        </v-col>
        <v-col class="" cols="8">
          <v-list rounded :disabled="choiceLocked || eliminated">
            <v-list-item-group
             v-model="selectedItem"
             color="primary"
            >
             <v-list-item
               v-for="(item, i) in options"
               :key="i"
             >
                 <v-list-item-content v-on:click="submitChoice(i)">
                   <v-list-item-title v-text="item" class="text-h5"
                   ></v-list-item-title>
                 </v-list-item-content>
               </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
      </v-row>
      <v-row no-gutters align-content='center' justify='center' class="mt-4"
      v-show='!(last && explanation)'>
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
</template>

<script>
import { post, get } from '@/assets/util/axios.js'
import { secretbox } from 'tweetnacl'
import {
  encodeUTF8,
  decodeBase64
} from 'tweetnacl-util'
import gameMusic from '@/components/gameShow/gameShowMusic.vue'
import audiopPlayer from '@/components/gameShow/localAudioEncrypt.vue'
export default {
  name: 'quiz',
  props: [
    'genInfo', 'currentTime', 'audioMuted', 'mediaInfo',
    'encrypted', 'questions', 'userIdInfo', 'eliminated', 'type'
  ],
  components: {
    gameMusic,
    audiopPlayer
  },
  data: () => ({
    toolate: false,
    choiceLocked: false,
    selectedItem: undefined,
    options: [],
    passwordInfo: {},
    questionNumber: 1,
    explanation: false,
    last: false,
    progress: 0,
    question: '',
    submittedTime: 30000000000000000000
  }),
  computed: {
    specificMediaInfo: function () {
      return this.mediaInfo[this.questionNumber]
    },
    audioFiles: function () {
      const question = this.mediaInfo[this.questionNumber]
      return { audio: question.audio, imgFiles: question.imgs }
    },
    humanVerificationTime: function () {
      return parseInt(this.genInfo.humanVerificationTime) * 1000
    },
    questionStartTime: function () {
      return (parseInt(this.genInfo.intro.length) * 1000) +
        (parseInt(this.genInfo.startEpochTime) * 1000) + this.humanVerificationTime
    },
    explanationTime: function () {
      return parseInt(this.genInfo.explantionTime) * 1000
    },
    timetoAnswer: function () {
      return parseInt(this.genInfo.timeToAnswerGenQuestion) * 1000
    },
    questionLength: function () {
      return this.timetoAnswer + this.explanationTime
    },
    totalquestions: function () {
      return parseInt(this.genInfo.numberOfQuestions)
    },
    allQuestionsLength: function () {
      return (this.explanationTime + this.timetoAnswer) * this.totalquestions
    },
    password: function () {
      if (this.passwordInfo[this.questionNumber] === undefined) {
        return false
      }
      if (this.passwordInfo[this.questionNumber].answer !== undefined) {
        return this.passwordInfo[this.questionNumber].answer
      }
      return false
    }
  },
  methods: {
    checkIfCorrect: function () {
      if (this.passwordInfo[this.questionNumber] === undefined) {
        return
      }
      if (this.passwordInfo[this.questionNumber].answerValue !== undefined) {
        if (this.passwordInfo[this.questionNumber].answerValue !== String(this.selectedItem)) {
          console.log(this.passwordInfo[this.questionNumber].answerValue, String(this.selectedItem))
          console.log('wrong answer')
          this.$emit('eliminated')
          return
        }
        console.log('your right')
        const startTime = this.questionStartTime
        const timetoAnswer = this.timetoAnswer
        const questionNumber = this.questionNumber
        const questionLength = this.questionLength
        const submitByTime = startTime + timetoAnswer + ((questionNumber - 1) * questionLength)
        if (this.submittedTime > submitByTime) {
          console.log('too late')
          this.toolate = true
          this.$emit('eliminated')
          return
        }
        console.log('submitted on time')
      }
    },
    submitChoice: function (choice) {
      this.submitAnswer(choice)
      this.choiceLocked = true
    },
    submitAnswer: async function (choice) {
      const url = this.genInfo.postApi
      const data = {
        address: this.userIdInfo[this.type],
        answer: choice,
        question: this.questionNumber
      }
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
      const correctQuestionReady = !(info[this.questionNumber].question === undefined)
      if (correctQuestionReady) {
        const answerNeeded = this.explanation
        if (!answerNeeded) {
          this.setQuestion()
          return
        }
        const answerReady = info[this.questionNumber].answer !== undefined
        if (!answerReady) {
          console.log('waiting')
          await sleep(waitTime)
          this.getPassword()
          return
        }
        this.checkIfCorrect()
        return
      }
      this.setQuestion()
      console.log('waiting')
      await sleep(waitTime)
      this.getPassword()
    },
    setQuestion: function () {
      if (this.encrypted) {
        const questionNumber = this.questionNumber
        if (this.passwordInfo[questionNumber] === undefined) {
          this.question = 'Loading Question'
          return
        }
        const decrypted = this.decryptFile(this.questions[questionNumber], this.passwordInfo[questionNumber].question)
        const parsed = JSON.parse(decrypted)
        this.question = parsed.question
        this.options = parsed.options
        return
      }
      this.options = this.questions[this.questionNumber].questionInfo.options
      this.question = this.questions[this.questionNumber].questionInfo.question
    }
  },
  watch: {
    currentTime: async function () {
      let questionNumber = 1
      let explanation = false
      let last = false
      let progress = 0
      const explanationTime = this.explanationTime
      for (var i = 1; i < this.totalquestions + 1; i++) {
        const proposedTime = this.questionStartTime + (this.questionLength * i)
        const correctQuestion = this.currentTime < proposedTime
        if (correctQuestion) {
          questionNumber = i
          if (this.currentTime > proposedTime - explanationTime) {
            explanation = true
            const topFract = proposedTime - this.currentTime
            const bottomFract = explanationTime
            progress = 100 - ((topFract / bottomFract) * 100)
            if (this.totalquestions === i) {
              last = true
            }
            break
          }
          const topFract = proposedTime - explanationTime - this.currentTime
          const bottomFract = this.timetoAnswer
          progress = 100 - ((topFract / bottomFract) * 100)
          break
        }
      }
      if (this.progress !== progress) {
        this.progress = progress
      }
      if (this.questionNumber !== questionNumber) {
        this.questionNumber = questionNumber
      }
      if (this.explanation !== explanation) {
        this.explanation = explanation
      }
      if (this.last !== last) {
        this.last = last
      }
    },
    explanation: async function (val) {
      this.getPassword()
    },
    questionNumber: async function () {
      this.toolate = false
      this.submittedTime = 30000000000000000000
      this.selectedItem = undefined
      this.choiceLocked = false
      this.setQuestion()
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
