<template>
  <v-row align="center" justify='space-around'>
    <v-col cols='6' class="text-center" offset='3'>
      <v-alert type="info" v-if='bonus'>
        Bonus Question
      </v-alert>
    </v-col>
   <v-col cols='5'>
     <videoPlayer
     />
   </v-col>
   <v-col cols='5' v-if='notes' class="text-center">
      <vue-markdown id='md' style=""
      :source='mdText'></vue-markdown>
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
      v-if='!notes'
      color="primary darken-2"
       @click="viewNotes()"
       class="mr-6"
     >
       Show Notes
     </v-btn>
     <v-btn
      v-if='notes'
      color="primary darken-2"
       @click="hideNotes()"
       class="mr-6"
     >
       Hide Notes
     </v-btn>
     <v-btn
       color="success darken-2"
       @click="startQuiz()"
     >
       Take Quiz
     </v-btn>
   </v-col>
  </v-row>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import videoPlayer from '@/components/general/videoHashed.vue'
const fs = require('fs')
const path = require('path')
export default {
  name: 'vidComp',
  components: {
    videoPlayer,
    VueMarkdown
  },
  props: ['vidUrl', 'bonus'],
  data () {
    return {
      mdText: '',
      notes: false
    }
  },
  methods: {
    startQuiz () {
      this.$emit('startQuiz')
    },
    skip () {
      this.$emit('quizDone')
    },
    viewNotes () {
      this.notes = true
    },
    hideNotes () {
      this.notes = false
    }
  },
  computed: {
  },
  mounted () {
    // eslint-disable-next-line
    const fileLocation = path.join(__static, 'courseNotes/intro/whyCrypto/part1.md')
    const fileContents = fs.readFileSync(fileLocation, 'utf8')
    this.mdText = fileContents
  }
}
</script>
<style >
#md {
  max-height:40vh;
  width:100%;
  overflow-y: auto;
  background-color:#424242;
}
</style>
