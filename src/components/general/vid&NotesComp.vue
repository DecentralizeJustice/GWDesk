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
   <v-col id=md cols='5' v-if='notes' class="text-center pa-5">
      <div v-html="html" ></div>
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
import videoPlayer from '@/components/general/videoHashed.vue'
export default {
  name: 'vidComp',
  components: {
    videoPlayer
  },
  props: ['vidUrl', 'bonus', 'html'],
  data () {
    return {
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
  }
}
</script>
<style >
#md {
  max-height: 40vh;
  overflow-y: auto;
  background-color:#424242;
  padding: 25px 50px 75px 100px;
}
#content > h1{
  text-align: center;
}
#content > h2{
  margin-top: .5rem;
  font-size: 1.5rem;
  text-align: left;
}
#content > p{
  font-size: 1.2rem;
  text-align: left;
}
#content > ul{
  font-size: 1.2rem;
  text-align: left;
}
</style>
