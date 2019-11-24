<template>
  <v-container>
    <video-player  class="video-player-box mx-auto"
             ref="videoPlayer"
             :options="playerOptions"
             :playsinline="true"/>
    </v-container>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'
// import introVid from '../../public/sample.mp4'
import path from 'path'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      filelocation: '',
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: path.join(process.env.BASE_URL, 'videos/sample.mp4')
        }],
        poster: path.join(process.env.BASE_URL, 'favicon.ico')
      }
    }
  },
  methods: {
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
