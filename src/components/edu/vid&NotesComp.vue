<template>
  <v-row align="center" justify='space-around'>
    <v-col cols='12' class="text-center" offset='0'>
      <!-- <v-alert type="info" v-if='bonus' style="width:30%;margin: auto;">
        Bonus Question
      </v-alert> -->
    </v-col>
     <v-row justify="center">
    <v-dialog v-model="dialogOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card style='overflow-x: hidden;'>
        <v-toolbar dark color="red">
          <v-btn icon dark @click="closeLargeVid()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Close</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <videoPlayer class="mt-5"
        v-bind:courseInfo="courseInfo"
        v-bind:pause="!dialogOpen"
        @paused="vidPaused"
        v-bind:time='time'
        />
      </v-card>
    </v-dialog>
  </v-row>
   <v-col cols='6'>
     <videoPlayer
     v-bind:courseInfo="courseInfo"
     v-bind:pause="dialogOpen"
     v-bind:time='time'
     @paused="vidPaused"
     />
   </v-col>
   <v-col id=md cols='6' v-if='notesOpen' class="text-center">
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
       @click.stop="openLargeVid()"
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
export default {
  name: 'vidComp',
  components: {
    videoPlayer
  },
  props: ['courseInfo', 'bonus', 'html'],
  data () {
    return {
      notesOpen: false,
      dialogOpen: false,
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
    openLargeVid () {
      this.dialogOpen = true
    },
    closeLargeVid () {
      this.dialogOpen = false
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
