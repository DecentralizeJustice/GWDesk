<template>
  <v-row align="center">
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
          label="Answer"
          outlined
        ></v-select>
      </v-col>
      <v-col cols='12' class="text-center">
        <v-btn
          color="red darken-2"
          @click="checkAnswer()"
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
      questionNum: 0
    }
  },
  methods: {
    backToVideo () {
      this.$emit('backToVideo')
    },
    checkAnswer () {
      console.log('checked')
    }
  },
  computed: {
    items: function () {
      const letters = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ']
      const options = []
      for (var i = 0; i < this.questions[this.questionNum].opt.length; i++) {
        options.push(letters[i].concat(this.questions[this.questionNum].opt[i]))
      }
      return options
    },
    question: function () {
      const value = this.questions[this.questionNum].q
      return value
    }
  }
}
</script>
