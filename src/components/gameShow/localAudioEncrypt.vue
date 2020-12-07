<template>
  <v-row no-gutters justify='center' align='center'>
    <v-col cols='8' style='text-align: center'>
      <v-img
      class=""
        :src="imgFile"
      ></v-img>
    </v-col>
    <audio ref="player" hidden autoplay
      :src="processedUrl" type="audio/mpeg" @error='audioError'
      style="">
    </audio>
  </v-row>
</template>

<script>
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['audioMuted', 'audioFiles'],
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
      this.player.muted = this.audioMuted
      const binary = this.convert(this.audio)
      const blob = new window.Blob([binary], { type: 'audio/mpeg' })
      const urlb = URL.createObjectURL(blob)
      this.processedUrl = urlb
    },
    convert: function (dataURI) {
      const base64String = ';base64,'
      const base64index = dataURI.indexOf(base64String) + base64String.length
      const base64 = dataURI.substring(base64index)
      const raw = window.atob(base64)
      const rawLength = raw.length
      const array = new Uint8Array(new ArrayBuffer(rawLength))
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      return array
    },
    audioError (e) {
      console.log(e.srcElement.error)
    }
  },
  computed: {
    imgFile: function () {
      return this.audioFiles.imgFiles[0]
    },
    audio: function () {
      return this.audioFiles.audio
    }
  },
  watch: {
    audioMuted: function (val) {
      this.player.muted = val
    }
  },
  async mounted () {
    await this.setup()
  }
}
</script>
