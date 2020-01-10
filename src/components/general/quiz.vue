<template>
  <v-row align="center">
    <v-col cols='6' class="text-center" offset='3'>
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
      </v-col>
      <v-col cols='3' class="text-center">
        <v-btn
          color="primary darken-1"
          @click="backToVideo()"
        >
          Back To Video
        </v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'quiz',
  components: {
  },
  props: ['questions'],
  data () {
    return {
      questionNum: 0,
      select: undefined,
      wrong: false
    }
  },
  methods: {
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
        this.$emit('done')
      } else {
        this.questionNum += 1
      }
    }
  },
  computed: {
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
    }
  }
}
</script>
