<template>
  <v-row align="center" justify='space-around'>
    <v-col cols='12' class="text-center">
      <fullscreen ref="fullscreenComp" @change="fullscreenChange">
        <fullscreenVid
          v-if='fullscreen'
          v-bind:courseInfo="courseInfo"
          v-bind:time='time'
          @paused="vidPaused"
          @toggle="toggle"/>
      </fullscreen>
    </v-col>
   <v-col cols='6'>
     <videoPlayer
     v-bind:courseInfo="courseInfo"
     v-bind:shouldPause="fullscreen"
     v-bind:time='time'
     @paused="vidPaused"
     />
   </v-col>
   <v-col id=md cols='5' v-if='notesOpen' class="text-center">
      <div v-html="html" ></div>
   </v-col>
   <v-col class="text-center" cols="12">
     <v-btn
       color="primary darken-1"
       @click="skip()"
       v-if='bonus'
       class="mr-6"
     >
       Finish
     </v-btn>
     <v-btn
       color="primary"
       dark
       class="mr-6"
       @click="toggle"
     >
       Expand Video
     </v-btn>
     <v-btn
      v-if='!notesOpen && !bonus'
      color="primary darken-2"
       @click="viewNotes()"
       class="mr-6"
     >
       Show Notes
     </v-btn>
     <v-btn
      v-if='notesOpen'
      color="primary darken-2"
       @click="hideNotes()"
       class="mr-6"
     >
       Hide Notes
     </v-btn>
     <v-btn
       color="success darken-2"
       @click="startQuiz()"
       v-if='!bonus'
     >
       Take Quiz
     </v-btn>
   </v-col>
  </v-row>
</template>

<script>
import videoPlayer from '@/components/general/localAudio.vue'
import fullscreen from 'vue-fullscreen'
import fullscreenVid from '@/components/general/fullscreenVid.vue'
import Vue from 'vue'
Vue.use(fullscreen)
export default {
  name: 'vidComp',
  components: {
    videoPlayer,
    fullscreenVid
  },
  props: ['courseInfo', 'bonus', 'html'],
  data () {
    return {
      notesOpen: false,
      fullscreen: false,
      time: 0
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
      this.notesOpen = true
    },
    hideNotes () {
      this.notesOpen = false
    },
    toggle () {
      // eslint-disable-next-line
      this.$refs['fullscreenComp'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    vidPaused (time) {
      this.time = time
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
}
#content > h1{
  text-align: center;
  text-decoration: underline;
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
