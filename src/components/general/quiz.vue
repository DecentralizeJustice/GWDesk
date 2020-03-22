<template>
  <v-row align="center">
    <v-col cols='6' class="text-center" offset='3'>
      <v-alert type="info" v-if='bonus'>
        Bonus Question
      </v-alert>
      <v-alert type="error" v-if='wrong'>
        Sorry, your answer is wrong. Try Again.
      </v-alert>
    </v-col>
    <v-col class="d-flex" cols="10" offset='1'>
      <v-card class="mx-auto" color='blue darken-4'
        >
      <v-card-text class="display-1 white--text">
      {{question}}
      </v-card-text>
    </v-card>
    </v-col>
      <v-col class="d-flex" cols="6" offset='3'>
        <v-select
          :items="items"
          label="Choices"
          item-text="value"
          item-value="index"
          v-model="select"
          outlined
        ></v-select>
      </v-col>
      <v-col cols='12' class="text-center">
        <v-btn
          color="red darken-2"
          @click="checkAnswer()"
          :disabled='answerDisabled'
        >
          Submit
        </v-btn>
        <v-btn
          color="green darken-2"
          @click="skip()"
          v-if='dev'
        >
          Skip
        </v-btn>
      </v-col>
      <v-col cols='4' offset='4'>
        <v-progress-linear
          :value='progress'
          color="green"
          height="25"
        >
          <template v-slot="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
      </v-col>
      <v-col cols='12' class="text-center" offset='' v-if='!bonus'>
        <v-btn
          color="primary darken-1"
          @click="backToVideo()"
        >
          Back To Video
        </v-btn>
        </v-col>
        <v-col cols='12' class="text-center" offset='' v-if='bonus'>
        <v-btn
          color="primary lighten-1"
          @click="skip()"
          class="mr-3"
        >
          Skip
        </v-btn>
        <v-btn
          color="primary darken-2"
          @click="backToVideo()"
          class=""
        >
          See Answer Video
        </v-btn>
        </v-col>
        <v-col cols='3' class="" offset='1' v-if='bonus'>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'quiz',
  components: {
  },
  props: ['questions', 'bonus'],
  data () {
    return {
      questionNum: 0,
      select: undefined,
      wrong: false
    }
  },
  methods: {
    skip () {
      this.$emit('quizDone')
    },
    backToVideo () {
      this.$emit('backToVideo')
    },
    checkAnswer () {
      if (this.select === this.correctAnswer) {
        this.correct()
      } else {
        this.wrong = true
      }
    },
    correct () {
      this.wrong = false
      this.select = undefined
      if (this.questionNum === this.questions.length - 1) {
        this.$emit('quizDone')
      } else {
        this.questionNum += 1
      }
    }
  },
  computed: {
    dev: function () {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      return false
    },
    items: function () {
      const letters = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ']
      const options = []
      const quest = this.questions
      for (var i = 0; i < quest[this.questionNum].opt.length; i++) {
        options.push(
          {
            value: letters[i].concat(quest[this.questionNum].opt[i]),
            index: i
          }
        )
      }
      return options
    },
    question: function () {
      const value = this.questions[this.questionNum].q
      return value
    },
    correctAnswer: function () {
      const value = this.questions[this.questionNum].ans
      return value
    },
    answerDisabled: function () {
      if (this.select === undefined) {
        return true
      }
      return false
    },
    progress: function () {
      const numberOfQuestions = this.questions.length
      return (this.questionNum / numberOfQuestions) * 100
    }
  }
}
</script>
