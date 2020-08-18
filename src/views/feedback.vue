<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters">
        <v-card-title class="headline justify-center">
          Questions and Feedback
        </v-card-title>
    <v-divider></v-divider>
    <v-container fluid v-if='error'>
    There Was an Error. Please Try Again Later.
    </v-container>
    <v-container fluid v-if='submitted && !error'>
      <v-row align="center">
        <v-col class="text-center " cols="8" offset='2'>
          <p class="display-2" >
            Thank You For {{thanksMessage}}.
          </p>
        </v-col>
        </v-row>
    </v-container>
    <v-container fluid v-if='!submitted && !error'>
    <v-row align="center">
      <v-col class="d-flex" cols="4" offset='4'>
        <v-select
          :items="items"
          label="Select Type"
          v-model="subject"
          solo
          background-color="grey darken-3"
        ></v-select>
      </v-col>
      </v-row>
      <v-row align="center">
      <v-col cols="8" class="text-center" offset='2'>
        <div class="">
        <v-textarea
          v-model="body"
          solo
          :disabled='bodyDisabled'
          background-color="grey darken-3"
          :label="textareaTitle"
        ></v-textarea>
        </div>
      </v-col>
      </v-row>
      <v-row align="center">
      <v-col class="text-center" cols="12">
      <div class="">
        <v-btn :disabled='submitDisabled'
          v-on:click="submitFeedback(subject, body)"
          color="primary">
          Submit
        </v-btn>
      </div>
    </v-col>
    </v-row>
  </v-container>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
  components: {
  },
  data: () => ({
    submitted: false,
    error: false,
    items: ['Feedback', 'Question'],
    body: '',
    subject: '',
    feedbackLink: 'https://us-central1-app-feedback-283918.cloudfunctions.net/feedback'
  }),
  methods: {
    async start () {
      try {
        await this.$router.push(
          {
            name: 'edu'
            // params: { course: 'Introduction', lesson: 2 }
          })
      } catch (err) {
        console.log(err)
      }
    },
    submitFeedback: async function (subject, body) {
      try {
        const result = await axios({
          method: 'post',
          url: this.feedbackLink,
          data: qs.stringify({
            subject: subject,
            body: body
          }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        })
        if (result.data.status === 'Success') {
          this.submitted = true
          console.log(result)
          return
        }
        this.error = true
        console.log(result)
      } catch (e) {
        console.log(e)
        this.error = true
      }
    }
  },
  computed: {
    // a computed getter
    thanksMessage: function () {
      if (this.subject === 'Question') {
        return 'Asking A Question'
      }
      return 'Submitting Feedback'
    },
    textareaTitle: function () {
      if (this.subject === 'Question') {
        return 'Ask Question'
      }
      return 'Submit Feedback'
    },
    bodyDisabled: function () {
      if (this.subject === '') {
        return true
      }
      return false
    },
    submitDisabled: function () {
      if (this.body === '') {
        return true
      }
      return false
    }
  },
  async mounted () {
    this.start()
  }
}
</script>
