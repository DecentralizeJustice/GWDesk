<template>
  <v-row align="center" justify='space-around'>
    <v-col cols='12'>
      <fullscreen ref="fullscreenComp" @change="fullscreenChange">
        <fullscreenVid
          v-if='fullscreen'
          v-bind:courseInfo="courseInfo"
          v-bind:time='time'
          @paused="vidPaused"
          @toggle="toggle"/>
      </fullscreen>
    </v-col>
   <v-col cols='7'>
     <videoPlayer
     v-bind:courseInfo="courseInfo"
     v-bind:shouldPause="fullscreen"
     v-bind:time='time'
     @paused="vidPaused"
     />
   </v-col>
   <v-col cols='3'>
     <v-row justify="center">
       <v-col id=md cols='12' v-if='html' class="text-center">
          <div v-html="html" ></div>
       </v-col>
      </v-row>
     <v-row justify="center">
       <v-col class="text-center" cols="12">
         <v-btn
           color="primary"
           dark
           class="ma-3"
           @click="toggle"
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
           color="red darken-1"
           @click="back()"
           class="ma-3"
           v-if='part !== 0'
         >
           Back
         </v-btn>
         <v-btn
           color="success darken-2"
           @click="exit()"
           v-if='done'
         >
           Finish
         </v-btn>
       </v-col>
     </v-row>
   </v-col>
  </v-row>
</template>

<script>
import videoPlayer from '@/components/general/localAudio.vue'
import fullscreenVid from '@/components/general/fullscreenVid.vue'
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(fullscreen)
export default {
  name: 'vidComp',
  components: {
    videoPlayer,
    fullscreenVid
  },
  props: ['courseInfo', 'html', 'part', 'done'],
  data () {
    return {
      time: 0,
      fullscreen: false
    }
  },
  methods: {
    toggle () {
      // eslint-disable-next-line
      this.$refs['fullscreenComp'].toggle()
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },
    next () {
      this.$emit('next')
    },
    back () {
      this.$emit('back')
    },
    vidPaused (time) {
      this.time = time
    },
    exit () {
      this.$emit('exit')
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
