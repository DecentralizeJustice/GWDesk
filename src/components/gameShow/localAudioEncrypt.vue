<template>
  <v-row no-gutters justify='center' align='center'>
    <v-col cols='8' style='text-align: center'>
      <v-img
      class=""
        :src="imgFile[0]"
      ></v-img>
    </v-col>
    <audio ref="player" hidden autoplay
      :src="audioUrl" type="audio/mpeg" @error='audioError'>
    </audio>
  </v-row>
</template>

<script>
import { secretbox } from 'tweetnacl'
import {
  encodeUTF8,
  decodeBase64
} from 'tweetnacl-util'
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['audioMuted', 'audioFiles', 'encrypted', 'password'],
  data () {
    return {
      audioUrl: '',
      player: '',
      currentSlide: 0,
      imgFile: []
    }
  },
  methods: {
    async setup (audio) {
      const binary = this.convert(audio)
      const blob = new window.Blob([binary], { type: 'audio/mpeg' })
      const urlb = URL.createObjectURL(blob)
      this.audioUrl = urlb
    },
    async handleImg (img, password) {
      const imgString = this.decryptFile(img, password)
      const binary = this.convert(imgString)
      const blob = new window.Blob([binary], { type: 'image/jpg' })
      const urlb = URL.createObjectURL(blob)
      this.imgFile.push(urlb)
    },
    convert: function (dataURI) {
      const raw = window.atob(dataURI)
      const rawLength = raw.length
      const array = new Uint8Array(new ArrayBuffer(rawLength))
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i)
      }
      return array
    },
    audioError (e) {
      console.log(e.srcElement.error)
    },
    decryptFile: function (file, key) {
      const decrypted = this.decrypt(file, key)
      return decrypted.file
    },
    decrypt: function (messageWithNonce, key) {
      const keyUint8Array = decodeBase64(key)
      const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce)
      const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength)
      const message = messageWithNonceAsUint8Array.slice(
        secretbox.nonceLength,
        messageWithNonce.length
      )

      const decrypted = secretbox.open(message, nonce, keyUint8Array)

      if (!decrypted) {
        throw new Error('Could not decrypt message')
      }

      const base64DecryptedMessage = encodeUTF8(decrypted)
      return JSON.parse(base64DecryptedMessage)
    }
  },
  computed: {
  },
  watch: {
    audioMuted: async function (val) {
      this.player.muted = val
    }
  },
  async mounted () {
    this.player = this.$refs.player
    this.player.muted = this.audioMuted
    if (!this.encrypted) {
      this.audioUrl = this.audioFiles.audio
      this.imgFile = this.audioFiles.imgFiles
      return
    }
    const audio = this.decryptFile(this.audioFiles.audio, this.password)
    this.setup(audio)
    function sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    this.handleImg(this.audioFiles.imgFiles[0], this.password)
    for (var i = 1; i < this.audioFiles.imgFiles.length; i++) {
      console.log('more than one')
      await sleep(2000)
      this.handleImg(this.audioFiles.imgFiles[i], this.password)
    }
  },
  async created () {
  }
}
</script>
