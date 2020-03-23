<template>
  <v-card>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
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

    <div v-if='currentComponent === "mainQuiz"'>
      <vidComp
      v-on:startQuiz='startQuiz()'
      v-bind:vidUrl="vidFileName"
      v-bind:bonus="false"
      v-if='vid'
      :html='html'/>
     <quiz
     v-bind:questions="test"
     v-on:backToVideo='backToVideo()'
     v-on:quizDone='partDone'
     v-if='!vid'
     v-bind:bonus="false"
     :key="234"
     />
  </div>
  <div v-if='currentComponent === "bonus"'>
    <vidComp
    :html='html'
    v-on:startQuiz='startQuiz()'
    v-bind:vidUrl="vidFileName"
    v-bind:bonus="true"
    v-if='vid'/>
   <quiz
   v-bind:questions="test"
   v-on:backToVideo='backToVideo()'
   v-on:quizDone='partDone'
   v-if='!vid'
   v-bind:bonus="true"
   :key="12"
   />
 </div>
  <congrats
  v-bind:vidUrl="vidFileName"
  v-if='currentComponent === "congrats"'
  v-on:quizDone='partDone'/>
    <v-divider/>
    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
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
import congrats from '@/components/general/congrats.vue'
import vidComp from '@/components/general/vid&NotesComp.vue'
import quiz from '@/components/general/quiz.vue'
export default {
  props: ['courseInfo'],
  data: () => ({
    vid: true,
    part: 0
  }),
  components: {
    quiz,
    vidComp,
    congrats
  },
  computed: {
    html: function () {
      return this.courseInfo.notes[this.part]
    },
    title: function () {
      return this.courseInfo.title
    },
    test: function () {
      if (this.currentComponent === 'bonus') {
        return this.courseInfo.questions.questions.bonus
      } else {
        const q = this.courseInfo.questions.questions
        const c = this.part
        const part = 'part' + (c + 1).toString()
        return q[part]
      }
    },
    vidFileName: function () {
      return 'video.mp4'
    },
    progress: function () {
      const numberOfQuestions = Object.keys(this.courseInfo.questions.questions).length
      return (this.part / numberOfQuestions) * 100
    },
    currentComponent: function () {
      const numberOfQuestions = Object.keys(this.courseInfo.questions.questions).length
      if (this.part < numberOfQuestions - 1) {
        return 'mainQuiz'
      }
      if (this.part === numberOfQuestions - 1) {
        return 'bonus'
      }
      if (this.part === numberOfQuestions) {
        return 'congrats'
      }
      // edge case that should never be reached
      return true
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
    partDone () {
      if (this.currentComponent === 'congrats') {
        this.exit()
        return
      }
      this.part += 1
      if (this.currentComponent !== 'bonus') {
        this.backToVideo()
      }
    }
  }
}
</script>
