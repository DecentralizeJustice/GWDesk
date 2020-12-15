<template>
  <audio ref="player1223" hidden autoplay
    :src="processedUrl" type="audio/mp3" @error='audioError' :muted='audioMuted'>
  </audio>
</template>

<script>
const fs = require('fs-extra')
const path = require('path')
export default {
  components: {
  },
  props: ['audioMuted'],
  data () {
    return {
      player: '',
      processedUrl: ''
    }
  },
  methods: {
    async setup () {
      const url = 'audio/shortQuestionMusic.mp3'
      // eslint-disable-next-line
      const fileLocation = path.join(__static, url)
      const fileContents = fs.readFileSync(fileLocation)
      const blob = new window.Blob([fileContents], { type: 'audio/mp3' })
      const urlb = URL.createObjectURL(blob)
      this.processedUrl = urlb
    },
    audioError (e) {
      console.log(e.srcElement.error)
    }
  },
  computed: {
  },
  watch: {
    audioMuted: function () {
      this.player.muted = this.audioMuted
    }
  },
  async mounted () {
    this.player = this.$refs.player1223
    this.player.muted = this.audioMuted
    await this.setup()
  }
}
</script>
