<template>
  <v-row no-gutters justify='center' align='center'>
    <v-col cols='8' style='text-align: center'>
      <v-img
      class=""
        :src="imgFile[0]"
      ></v-img>
    </v-col>
    <audio ref="player" hidden autoplay
      :src="audioUrl" type="audio/mpeg" @error='audioError'
      style="">
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
  props: ['audioMuted', 'audioFiles', 'encrypted'],
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
    },
    decryptFile: function (file, key) {
      const input = file
      const decrypted = this.decrypt(input, key)
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
    audio: function () {
      return this.audioFiles.audio
    }
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
    }
    // const audio = this.decryptFile(this.audio, 'EO0hkdqWFssaBg6k1A0Q+H690wIUq5gBLIRl6iO2KzU=')
    // this.setup(audio)
    // function sleep (ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms))
    // }
    // this.imgFile[0] = this.decryptFile(this.audioFiles.imgFiles[0], 'wVQj0U4T9B0rQ7EZR8WYABzpp0EOULQV+m3acE8XRTM=')
    // for (var i = 1; i < this.audioFiles.imgFiles.length; i++) {
    //   console.lg('more than one')
    //   await sleep(1000)
    //   this.imgFile[i].push(this.decryptFile(this.audioFiles.imgFiles[i], 'wVQj0U4T9B0rQ7EZR8WYABzpp0EOULQV+m3acE8XRTM='))
    // }
  },
  async beforeMount () {
  }
}
</script>
