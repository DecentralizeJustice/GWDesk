<template>
    <v-layout row wrap justify-center>
      <v-flex xs8>
        <v-img :src='slide' contain></v-img>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap justify-center>
          <audio controls @timeupdate="updateTime" ref="player" class="mt-4" :src="processedUrl" type="audio/mp3" @error='hu'>
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
    hu (e) {
      console.log(e.srcElement.error)
    },
    updateTime () {
      const breakpoints = this.courseInfo.breakpoints
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
    const blob = new window.Blob([fileContents], { type: 'audio/mp3' })
    const urlb = URL.createObjectURL(blob)
    this.processedUrl = urlb
  }
}
</script>
