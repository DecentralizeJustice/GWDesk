<template>
  <v-card>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
    <v-divider/>
    <v-row align="center" justify='space-around'>
      <v-col cols='5'>
        <v-btn depressed>
        Normal
      </v-btn>
      <v-btn
        depressed
        color="primary"
      >
        Primary
      </v-btn>
      <v-btn
        depressed
        color="error"
      >
        Error
      </v-btn>
      <v-btn
        depressed
        disabled
      >
        Disabled
      </v-btn>
    </v-col>
     <v-col cols='6'>
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      Select an app
      <small>Summarize if needed</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <!-- <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card> -->
      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Configure analytics for this app
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

  </v-stepper>
     </v-col>
    </v-row>
  <v-divider/>
  <v-card-actions>
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
export default {
  props: ['courseInfo'],
  data: () => ({
    e6: 1
  }),
  components: {
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
