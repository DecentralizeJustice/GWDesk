<template>
  <v-card>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
    <v-divider/>
    <v-row align="center" v-if='!justVid'>
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
    <div v-if='justVid'>
      <justVidComp
      v-bind:courseInfo="courseInfo"/>
    </div>
    <div v-if='!justVid && currentComponent === "mainQuiz"'>
      <vidComp
      v-on:startQuiz='startQuiz()'
      v-bind:courseInfo="correctLesson"
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
  <div v-if='!justVid && currentComponent === "bonus"'>
    <vidComp
    :html='html'
    v-on:startQuiz='startQuiz()'
    v-on:quizDone='partDone'
    v-bind:vidUrl="vidURL"
    v-bind:vidHash="vidHash"
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
  v-bind:vidUrl="vidURL"
  v-bind:vidHash="vidHash"
  v-bind:nextLessonavAilable='nextLessonavAilable'
  v-if='!justVid && currentComponent === "congrats"'
  v-on:quizDone='partDone'
  v-on:nextLesson='nextLesson()'/>
    <v-divider/>
    <v-card-actions>
      <!-- <v-btn
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn> -->
    <v-btn
      color="red darken-1"
      @click="exit()"
    >
      Exit
    </v-btn>
    <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import justVidComp from '@/components/general/localAudio.vue'
import congrats from '@/components/edu/congrats.vue'
import vidComp from '@/components/edu/vid&NotesComp.vue'
import quiz from '@/components/edu/quiz.vue'
export default {
  props: ['courseInfo'],
  data: () => ({
    vid: true,
    part: 0
  }),
  components: {
    quiz,
    vidComp,
    congrats,
    justVidComp
  },
  computed: {
    correctLesson: function () {
      return this.courseInfo
    },
    justVid: function () {
      return this.courseInfo.justVideo
    },
    html: function () {
      return this.courseInfo.notes[this.part]
    },
    title: function () {
      return this.courseInfo.title
    },
    nextLessonTitle: function () {
      return this.courseInfo.nextLesson
    },
    nextLessonavAilable: function () {
      if (this.nextLessonTitle === undefined) {
        return false
      }
      return true
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
    nextLesson () {
      this.$emit('changeLesson', this.nextLessonTitle)
    },
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
