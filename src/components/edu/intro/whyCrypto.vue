<template>
  <v-card>
    <v-card-title class="headline justify-center">What is Cryptocurrency?</v-card-title>
    <v-divider/>
    <v-row align="center">
     <v-col cols='10' offset='1'>
       <v-progress-linear
         :value='progress'
         color="blue-grey"
         height="25"
       >
         <template v-slot="{ value }">
           <strong>{{ Math.ceil(value) }}%</strong>
         </template>
       </v-progress-linear>
     </v-col>
    </v-row>

    <vidComp
    v-on:startQuiz='startQuiz()'
    v-bind:vidUrl="vidUrl"
    v-bind:bonus="bonus"
    v-if='vid'/>
   <quiz
   v-bind:questions="test"
   v-on:backToVideo='backToVideo()'
   v-on:quizDone='quizDone'
   v-if='!vid&&!bonus'
   v-bind:bonus="bonus"
   :key="234"
   />
   <quiz
   v-bind:questions="test"
   v-on:backToVideo='backToVideo()'
   v-on:quizDone='quizDone'
   v-if='!vid&&bonus'
   v-bind:bonus="bonus"
   :key="12"
   />
    <v-divider/>
    <v-card-actions>
      <v-btn
        color="red darken-1"
        text
        @click="exit()"
      >
        Exit
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import vidComp from '@/components/general/vidComp.vue'
import quiz from '@/components/general/quiz.vue'
import questions from '@/assets/eduTest/intro/introWhyCryptocurrency.js'
export default {
  data: () => ({
    vid: true,
    part: 0
  }),
  components: {
    quiz,
    vidComp
  },
  computed: {
    test: function () {
      if (this.bonus) {
        const q = questions.questions
        return q.bonus
      } else {
        const q = questions.questions
        const c = this.part
        const part = 'part' + (c + 1).toString()
        return q[part]
      }
    },
    bonus: function () {
      const numberOfQuestions = Object.keys(questions.questions).length
      if (numberOfQuestions - 1 === this.part) {
        return true
      }
      return false
    },
    vidUrl: function () {
      return '/videos/video.mp4'
    },
    progress: function () {
      const numberOfQuestions = Object.keys(questions.questions).length
      return (this.part / numberOfQuestions) * 100
    }
  },
  methods: {
    exit () {
      this.$emit('changeLesson', '')
    },
    startQuiz () {
      this.vid = false
    },
    backToVideo () {
      this.vid = true
    },
    quizDone () {
      this.part += 1
      if (this.part === Object.keys(questions.questions).length) {
        this.exit()
        return
      }
      if (!this.bonus) {
        this.backToVideo()
      }
    }
  }
}
</script>
