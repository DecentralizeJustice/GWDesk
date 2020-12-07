<template>
  <div>
    <div>
      <v-card-title class="headline justify-center">
      Question #{{questionNumber.question}}
      </v-card-title>
      <v-divider/>
      <audiopPlayer
      v-if='questionNumber.explantion'
      v-bind:audioMuted='audioMuted'
      v-bind:audioFiles='audioFiles'
      />
      <v-row align-content='center' justify='center' v-show='!questionNumber.explantion'>
        <gameMusic v-bind:audioMuted='audioMuted'
        v-if='!questionNumber.explantion'/>
        <v-col class="" cols="10" >
          <v-card class="mx-auto" color='blue darken-4'
            >
        <v-card-text class="display-1 white--text">
        {{question}}
        </v-card-text>
        </v-card>
        </v-col>
        <v-col class="" cols="8">
          <v-list rounded>
            <v-list-item-group
             v-model="selectedItem"
             color="primary"
            >
             <v-list-item
               v-for="(item, i) in options"
               :key="i"
             >
                 <v-list-item-content>
                   <v-list-item-title v-text="item" class="text-h5"></v-list-item-title>
                 </v-list-item-content>
               </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
      </v-row>
      <v-row no-gutters align-content='center' justify='center' class="mt-4"
      v-show='!(questionNumber.last && questionNumber.explantion)'>
        <v-col cols='6' class="mb-5">
        <div class="mb-3 text-h6" v-show='!questionNumber.explantion'>Time:</div>
        <div class="mb-3 text-h6" v-show='questionNumber.explantion'>Time To Next Question:</div>
          <v-progress-linear
            color="light-blue"
            height="10"
            :value="questionNumber.progress"
            striped
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import gameMusic from '@/components/gameShow/gameShowMusic.vue'
import audiopPlayer from '@/components/gameShow/localAudioEncrypt.vue'
export default {
  props: ['genInfo', 'currentTime', 'audioMuted'],
  components: {
    gameMusic,
    audiopPlayer
  },
  data: () => ({
    eliminated: false,
    selectedItem: undefined
  }),
  computed: {
    audioFiles: function () {
      return { audio: this.genInfo.intro.audio, imgFiles: this.genInfo.intro.img }
    },
    questionNumber: function () {
      let question = 1
      let explantion = false
      let last = false
      let progress = 23
      const explantionTime = this.explantionTime
      for (var i = 1; i < this.totalquestions + 1; i++) {
        const proposedTime = this.questionStartTime + (this.questionLength * i)
        const correctQuestion = this.currentTime < proposedTime
        if (correctQuestion) {
          question = i
          if (this.currentTime > proposedTime - explantionTime) {
            explantion = true
            const topFract = proposedTime - this.currentTime
            const bottomFract = this.timetoAnswer
            progress = 100 - ((topFract / bottomFract) * 100)
            if (this.totalquestions === i) {
              last = true
            }
            break
          }
          const topFract = proposedTime - explantionTime - this.currentTime
          const bottomFract = this.timetoAnswer
          progress = 100 - ((topFract / bottomFract) * 100)
          break
        }
      }
      return { question, explantion, last, progress }
    },
    watchQustionNumber: function () {
      return this.questionNumber.question
    },
    questionStartTime: function () {
      return (parseInt(this.genInfo.intro.length) * 1000) +
        (parseInt(this.genInfo.startEpochTime) * 1000)
    },
    options: function () {
      const options = this.genInfo[this.questionNumber.question].options
      return options
    },
    question: function () {
      return this.genInfo[this.questionNumber.question].question
    },
    explantionTime: function () {
      return parseInt(this.genInfo.explantionTime) * 1000
    },
    timetoAnswer: function () {
      return parseInt(this.genInfo.timeToAnswerGenQuestion) * 1000
    },
    questionLength: function () {
      return this.timetoAnswer + this.explantionTime
    },
    totalquestions: function () {
      return parseInt(this.genInfo.numberOfQuestions)
    },
    allQuestionsLength: function () {
      return (this.explantionTime + this.timetoAnswer) * this.totalquestions
    }
  },
  methods: {
    audioError (e) {
      console.log(e.srcElement.error)
    }
  },
  watch: {
    watchQustionNumber: function () {
      this.selectedItem = undefined
    }
  },
  async mounted () {
  }
}
</script>
