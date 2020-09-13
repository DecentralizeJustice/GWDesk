<template>
  <v-row align="center" justify='space-around'>
    <v-col cols='12' class="text-center" offset='0'>
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

        <v-container>
            <v-row
              no-gutters
              justify='center'
            >
              <v-col lg='5' md='7' sm='7' xl='5'>
               <videoPlayer class=""
               v-bind:courseInfo="courseInfo"
               v-bind:pause="!dialogOpen"
               @paused="vidPaused"
               v-bind:time='time'
               />
               </v-col>
            </v-row>
          </v-container>
      </v-card>
    </v-dialog>
  </v-row>
  <v-col class="text-center" cols="3">
    <v-btn
      color="red darken-1"
      @click="back()"
      class="ma-3"
      v-if='part !== 0'
    >
      Back
    </v-btn>
    <v-btn
      color="primary"
      dark
      class="ma-3"
      @click.stop="openLargeVid()"
    >
      Expand Video
    </v-btn>
    <v-btn
      color="success darken-2"
      @click="next()"
      v-if='!done'
    >
      Next
    </v-btn>
    <v-btn
      color="success darken-2"
      @click="next()"
      v-if='done'
    >
      Finish
    </v-btn>
  </v-col>
   <v-col cols='3'>
     <videoPlayer
     v-bind:courseInfo="courseInfo"
     v-bind:pause="dialogOpen"
     v-bind:time='time'
     @paused="vidPaused"
     />
   </v-col>
   <v-col id=md cols='3' v-if='html' class="text-center">
      <div v-html="html" ></div>
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
  props: ['courseInfo', 'html', 'part', 'done'],
  data () {
    return {
      dialogOpen: false,
      time: 0
    }
  },
  methods: {
    next () {
      this.$emit('next')
    },
    back () {
      this.$emit('back')
    },
    openLargeVid () {
      this.dialogOpen = true
    },
    closeLargeVid () {
      this.dialogOpen = false
    },
    vidPaused (time) {
      this.time = time
    },
    exit () {
      this.$emit('back')
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
