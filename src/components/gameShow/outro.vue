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
    v-bind:mediaInfo='specificMediaInfo'
    v-bind:password='password'
    v-if='password'/>
  </div>
</template>

<script>
import audio1 from '@/components/gameShow/localAudioEncrypt.vue'
import { get } from '@/assets/util/axios.js'
export default {
  name: 'outro',
  props: ['genInfo', 'currentTime', 'audioMuted', 'mediaInfo', 'encrypted'],
  components: {
    audio1
  },
  data: () => ({
    passwordInfo: {}
  }),
  computed: {
    specificMediaInfo: function () {
      return this.mediaInfo.outro
    },
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
      const url = this.genInfo.getApi
      const result = await get(url)
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
