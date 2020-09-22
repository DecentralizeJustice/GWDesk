<template>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-img :src='slide' contain></v-img>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap justify-center>
          <audio controls @timeupdate="updateTime" ref="player" class="mt-4"
          :src="processedUrl" type="audio/mp3" @error='audioError'
          controlsList="nodownload">
        </audio>
        </v-layout>
      </v-flex>
      <!-- <v-btn color='primary' class='mt-3' @click='goToNextLesson'
      v-if='nextLessonAvailable'>Next Lesson</v-btn> -->
    </v-layout>
</template>

<script>
const fs = require('fs-extra')
const path = require('path')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: {
    courseInfo: {},
    time: { default: 0 },
    shouldPause: { default: true }
  },
  data () {
    return {
      processedUrl: '',
      player: '',
      currentSlide: 0
    }
  },
  methods: {
    async setup () {
      this.player = this.$refs.player
      const url = this.courseInfo.audio
      // eslint-disable-next-line
      const fileLocation = path.join(__static, url)
      const fileContents = fs.readFileSync(fileLocation)
      const blob = new window.Blob([fileContents], { type: 'audio/mp3' })
      const urlb = URL.createObjectURL(blob)
      this.processedUrl = urlb
    },
    audioError (e) {
      console.log(e.srcElement.error)
    },
    goToNextLesson () {
      this.$router.push(
        {
          name: 'dummy',
          params: {
            lesson: this.courseInfo.nextLesson.lesson,
            course: this.courseInfo.nextLesson.course
          }
        })
    },
    updateTime () {
      const breakpoints = this.addFirstBreakpoint(this.courseInfo.breakpoints)
      const time = this.player.currentTime
      for (var i = 0; i < breakpoints.length; i++) {
        const lowseconds = this.getSeconds(breakpoints[i])
        const highseconds = this.getSeconds(breakpoints[i + 1])
        const lastSlide = (highseconds === undefined)
        const correctSlide = (time >= lowseconds && time < highseconds)
        if (lastSlide || correctSlide) {
          this.currentSlide = i
          break
        }
      }
    },
    addFirstBreakpoint (breakpoints) {
      if (breakpoints[0] !== '0:00') {
        breakpoints.splice(0, 0, '0:00')
      }
      return breakpoints
    },
    getSeconds (timeString) {
      if (typeof timeString === 'undefined') {
        return undefined
      }
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
    shouldPause: function () {
      if (this.shouldPause === true) {
        this.player.pause()
        this.$emit('paused', this.player.currentTime)
      }
    },
    time: function () {
      this.player.currentTime = this.time
    },
    courseInfo: function () {
      this.setup()
    }
  },
  computed: {
    slide: function () {
      return this.courseInfo.slides[this.currentSlide]
    },
    nextLessonAvailable: function () {
      if (this.courseInfo.nextLesson) {
        return true
      }
      return false
    }
  },
  updated () {
  },
  async mounted () {
    this.setup()
  },
  async beforeDestroy () {
    this.player.pause()
    this.$emit('paused', this.player.currentTime)
  }
}
</script>
