<template>
    <v-layout row wrap justify-center>
      <v-flex xs9>
        <v-img :src='slide' contain></v-img>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap justify-center>
          <audio controls @timeupdate="updateTime" ref="player" class="mt-4">
          <source :src="processedUrl" type="audio/mpeg">
        </audio>
        </v-layout>
      </v-flex>
    </v-layout>
</template>

<script>
import courseInfo from '@/assets/courseData/courses/intro/welcome.js'
const fs = require('fs-extra')
const path = require('path')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['vidUrl'],
  data () {
    return {
      processedUrl: '',
      player: '',
      currentSlide: 0
    }
  },
  methods: {
    updateTime () {
      const breakpoints = courseInfo.breakpoints
      const time = this.player.currentTime
      for (var i = 0; i < breakpoints.length; i++) {
        const lastSlide = (breakpoints[i + 1] === undefined)
        const correctSlide = (time > breakpoints[i] && time < breakpoints[i + 1])
        if (lastSlide || correctSlide) {
          this.currentSlide = i
          break
        }
      }
    }
  },
  computed: {
    slide: function () {
      return courseInfo.slides[this.currentSlide]
    }
  },
  async mounted () {
    // console.log(this.vidUrl)
    this.player = this.$refs.player
    const url = courseInfo.audio[0]
    // eslint-disable-next-line
    const fileLocation = path.join(__static, url)
    const fileContents = fs.readFileSync(fileLocation)
    const blob = new window.Blob([fileContents], { type: 'video/mp3' })
    const urlb = URL.createObjectURL(blob)
    this.processedUrl = urlb
  }
}
</script>
