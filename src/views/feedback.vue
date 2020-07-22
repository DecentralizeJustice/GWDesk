<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters">
        <v-card-title class="headline justify-center">
          Questions and Feedback
        </v-card-title>
            <v-divider></v-divider>
            <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="items"
          label="Type"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea
          solo
          name="input-7-4"
          label="Leave Feedback"
        ></v-textarea>
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
    items: ['Feedback', 'Question'],
    feedbackLink: 'https://us-central1-app-feedback-283918.cloudfunctions.net/feedback'
  }),
  methods: {
    submitFeedback: async function (subject, body) {
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
      console.log(result)
    },
    cardColor (state) {
      if (state) {
        return 'blue'
      }
      return 'grey darken-3'
    },
    iconColor (state) {
      if (state) {
        return 'indigo darken-4'
      }
      return 'white'
    }
  },
  mounted () {
    // this.openDialog()
  }
}
</script>
