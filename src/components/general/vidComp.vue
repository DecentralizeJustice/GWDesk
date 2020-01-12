<template>
  <v-row align="center">
    <v-col cols='6' class="text-center" offset='3'>
      <v-alert type="info" v-if='bonus'>
        Bonus Question
      </v-alert>
    </v-col>
   <v-col cols='8' offset='2'>
     <videoPlayer
     v-bind:url="url"
     />
   </v-col>
   <v-col class="text-center" cols="12">
     <v-btn
       color="primary lighten-1"
       @click="skip()"
       v-if='bonus'
       class="mr-6"
     >
       Skip
     </v-btn>
     <v-btn
       color="primary darken-2"
       @click="startQuiz()"
     >
       Take Quiz
     </v-btn>
   </v-col>
  </v-row>
</template>

<script>
import videoPlayer from '@/components/general/videoHashed.vue'
export default {
  name: 'vidComp',
  components: {
    videoPlayer
  },
  props: ['vidUrl', 'bonus'],
  data () {
    return {
    }
  },
  methods: {
    startQuiz () {
      this.$emit('startQuiz')
    },
    skip () {
      this.$emit('quizDone')
    }
  },
  computed: {
    url: function () {
      const path = require('path')
      const fileLocation = path.join(process.env.BASE_URL, this.vidUrl)
      return fileLocation
    }
  }
}
</script>
