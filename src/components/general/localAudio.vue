<template>
  <div>
      <audio controls @timeupdate="updateTime" ref="player">
        <source :src="processedUrl" type="audio/mpeg">
      </audio>
  </div>
</template>

<script>
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
      player: ''
    }
  },
  methods: {
    updateTime (time) {
      console.log(this.player.currentTime)
    }
  },
  computed: {
  },
  async mounted () {
    // console.log(this.vidUrl)
    this.player = this.$refs.player
    const url = 'audio/welcome/Welcome.mp3' // + this.vidUrl
    // eslint-disable-next-line
    const fileLocation = path.join(__static, url)
    const fileContents = fs.readFileSync(fileLocation)
    const blob = new window.Blob([fileContents], { type: 'video/mp3' })
    const urlb = URL.createObjectURL(blob)
    this.processedUrl = urlb
  }
}
</script>
