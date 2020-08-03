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
const fs = require('fs-extra')
const path = require('path')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['courseInfo', 'pause', 'time'],
  data () {
    return {
      processedUrl: '',
      player: '',
      currentSlide: 0
    }
  },
  methods: {
    updateTime () {
      const breakpoints = this.courseInfo.breakpoints
      const time = this.player.currentTime
      for (var i = 0; i < breakpoints.length; i++) {
        const lastSlide = (breakpoints[i + 1] === undefined)
        const correctSlide = (
          time > this.getSeconds(breakpoints[i]) &&
          time < this.getSeconds(breakpoints[i + 1]))
        if (lastSlide || correctSlide) {
          this.currentSlide = i
          break
        }
      }
    },
    getSeconds (timeString) {
      const times = timeString.split(':')
      times[0] = parseInt(times[0], 10)
      times[1] = parseInt(times[1], 10)
      let timeSeconds = 0
      timeSeconds += (times[0] * 60)
      timeSeconds += times[1]
      return timeSeconds
    }
  },
  watch: {
    pause: function () {
      if (this.pause === true) {
        this.player.pause()
        this.$emit('paused', this.player.currentTime)
      }
    },
    time: function () {
      this.player.currentTime = this.time
    }
  },
  computed: {
    slide: function () {
      return this.courseInfo.slides[this.currentSlide]
    }
  },
  async mounted () {
    this.player = this.$refs.player
    const url = this.courseInfo.audio
    // eslint-disable-next-line
    const fileLocation = path.join(__static, url)
    const fileContents = fs.readFileSync(fileLocation)
    const blob = new window.Blob([fileContents], { type: 'video/mp3' })
    const urlb = URL.createObjectURL(blob)
    this.processedUrl = urlb
  }
}
</script>
