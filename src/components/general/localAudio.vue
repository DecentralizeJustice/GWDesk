<template>
  <div justify-content='center'>
    <v-img :src='slide'></v-img>
      <audio controls @timeupdate="updateTime" ref="player">
        <source :src="processedUrl" type="audio/mpeg">
      </audio>
  </div>
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
        if (time > breakpoints[i] && time < breakpoints[i + 1]) {
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
