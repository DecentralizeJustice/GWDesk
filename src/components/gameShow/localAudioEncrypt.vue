<template>
  <v-row no-gutters justify='center' align='center'>
    <v-col cols='10' style='text-align: center'>
      <v-img
      class="mt-4"
        :src="imgFile"
      ></v-img>
    </v-col>
      <audio ref="player" class="ma-4" hidden
        :src="processedUrl" type="audio/mpeg" @error='audioError'
        style="">
      </audio>
  </v-row>
</template>

<script>
import info from '@/assets/gameShow/files/intro.json'
import img from '@/assets/gameShow/files/img.json'
export default {
  name: 'videoPlayer',
  components: {
  },
  props: {
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
      const binary = this.convert(info[0])
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
  watch: {
  },
  computed: {
    imgFile: function () {
      return img[0]
    }
  },
  async mounted () {
    await this.setup()
    this.player.play()
  }
}
</script>
