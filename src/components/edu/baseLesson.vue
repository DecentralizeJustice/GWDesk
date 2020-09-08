<template>
  <v-card>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
    <v-divider/>
    <v-row align="center" v-if='!justVid && currentComponent && currentComponent !== "congrats"'>
     <v-col cols='10' offset='1'>
       <v-progress-linear
         :value='progress'
         color="blue-grey"
         height="18"
       >
         <template v-slot="{ value }">
           <strong>{{ Math.ceil(value) }}%</strong>
         </template>
       </v-progress-linear>
     </v-col>
    </v-row>
    <v-container>
        <v-row
          no-gutters
          justify='center'
        >
          <v-col cols='8'>
            <justVidComp
            v-if='justVid'
            v-bind:courseInfo="courseInfo.comp"/>
           </v-col>
        </v-row>
      </v-container>

    <div v-if='!justVid && currentComponent === "mainQuiz"'>
      <v-container>
          <v-row
            no-gutters
            justify='center'
          >
            <v-col cols='12'>
              <vidComp
              v-on:startQuiz='startQuiz()'
              v-bind:courseInfo="correctLessonInfo"
              v-bind:bonus="false"
              :html='html'
              v-if='vid'/>
             </v-col>
          </v-row>
        </v-container>
     <quiz
     v-bind:questions="test"
     v-on:backToVideo='backToVideo()'
     v-on:quizDone='partDone'
     v-if='!vid'
     v-bind:bonus="false"
     :key="234"
     />
  </div>
  <!-- <div v-if='!justVid && currentComponent === "bonus"'>
    <vidComp
    :html='html'
    v-on:startQuiz='startQuiz()'
    v-on:quizDone='partDone'
    v-bind:courseInfo="correctLessonInfo"
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
  </div> -->
  <v-container>
      <v-row
        no-gutters
        justify='center'
      >
        <v-col cols='8'>
          <justVidComp
          v-bind:courseInfo="correctLessonInfo"
          v-if='!justVid && currentComponent === "congrats"'
          v-on:quizDone='partDone'/>
         </v-col>
      </v-row>
    </v-container>
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
// import congrats from '@/components/edu/congrats.vue'
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
    justVidComp
  },
  computed: {
    correctLessonInfo: function () {
      let nextLesson
      const numberOfQuestions = this.questions.length
      if (this.part === numberOfQuestions) {
        nextLesson = this.courseInfo.comp.nextLesson
      }
      const info = {
        slides: this.courseInfo.comp.slides[this.part],
        breakpoints: this.courseInfo.comp.breakpoints[this.part],
        audio: this.courseInfo.comp.audio[this.part],
        nextLesson: nextLesson
      }
      return info
    },
    justVid: function () {
      return this.courseInfo.comp.justVideo
    },
    html: function () {
      return this.courseInfo.comp.notes[this.part]
    },
    title: function () {
      return this.courseInfo.comp.title
    },
    test: function () {
      return this.questions[this.part]
    },
    progress: function () {
      const numberOfQuestions = this.questions.length
      return (this.part / numberOfQuestions) * 100
    },
    questions: function () {
      return this.courseInfo.comp.questions
    },
    currentComponent: function () {
      const numberOfQuestions = this.questions.length
      if (this.part < numberOfQuestions) {
        return 'mainQuiz'
      }
      // if (this.part === numberOfQuestions - 1) {
      //   return 'bonus'
      // }
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
      this.backToVideo()
    }
  },
  mounted () {
    // console.log(this.courseInfo)
  }
}
</script>
