<template>
  <div>
    <v-card-title class="headline justify-center">
    Closing Remarks
    </v-card-title>
    <v-divider/>
    <audio1
    class='pa-5'
    v-bind:audioMuted='audioMuted'
    v-bind:audioFiles='audioFiles'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='mediaInfo'
    v-bind:password='password'
    v-if='password'/>
  </div>
</template>

<script>
import audio1 from '@/components/gameShow/localAudioEncrypt.vue'
import axios from 'axios'
export default {
  props: ['genInfo', 'currentTime', 'audioMuted', 'mediaInfo', 'encrypted'],
  components: {
    audio1
  },
  data: () => ({
    passwordInfo: {}
  }),
  computed: {
    audioFiles: function () {
      const outro = this.mediaInfo.outro
      return { audio: outro.audio, imgFiles: outro.img }
    },
    password: function () {
      if (this.passwordInfo.outro === undefined) {
        return false
      }
      if (this.passwordInfo.outro.password !== undefined) {
        return this.passwordInfo.outro.password
      }
      return false
    }
  },
  methods: {
    getPassword: async function () {
      const result = await axios({
        method: 'get',
        url: this.genInfo.getApi
      })
      function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      const waitTime = parseFloat(this.genInfo.waitTime) * 1000
      if (result.data.info.outro.password === undefined) {
        console.log('waiting')
        await sleep(waitTime)
        this.getPassword()
      }
      this.passwordInfo = result.data.info
    }
  },
  watch: {
  },
  async mounted () {
  },
  async created () {
    await this.getPassword()
  }
}
</script>
