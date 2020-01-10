<template>
  <v-card>
    <v-card-title class="headline justify-center">What is Cryptocurrency?</v-card-title>
    <v-divider/>
    <v-row align="center" v-if='vid'>
     <v-col cols='10' offset='1'>
       <videoPlayer
       v-bind:url="url"
       />
     </v-col>
     <v-col class="text-center" cols="12">
       <v-btn
         color="primary darken-1"
         @click="startQuiz()"
       >
         Take Quiz
       </v-btn>
     </v-col>
   </v-row>
   <quiz
   v-bind:questions="questions"
   v-on:backToVideo='backToVideo()'
   v-if='!vid'
   />
    <v-divider/>
    <v-card-actions>
      <!-- <v-btn
        color="green darken-1"
        text
        @click=""
      >
        Back
      </v-btn> -->
      <v-btn
        color="green darken-1"
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
import videoPlayer from '@/components/general/videoHashed.vue'
import quiz from '@/components/general/quiz.vue'
import questions from '@/assets/eduTest/intro/introWhyCryptocurrency.js'
export default {
  data: () => ({
    vid: true
  }),
  components: {
    videoPlayer,
    quiz
  },
  computed: {
    url: function () {
      const path = require('path')
      const fileLocation = path.join(process.env.BASE_URL, '/videos/video.mp4')
      return fileLocation
    },
    questions: function () {
      return questions.questions.part1
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
    }
  }
}
</script>
