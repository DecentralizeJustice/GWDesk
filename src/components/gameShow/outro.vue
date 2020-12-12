<template>
  <div>
    <v-card-title class="headline justify-center">
    Closing Remarks
    </v-card-title>
    <v-divider/>

    <audio1
    class="pa-5"
    v-bind:audioMuted='audioMuted'
    v-bind:audioFiles='audioFiles'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='mediaInfo'/>
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
    }
  },
  methods: {
    getPassword: async function () {
      const result = await axios({
        method: 'get',
        url: this.genInfo.getApi
      })
      console.log(result.data.info)
      this.passwordInfo = result.data
    }
  },
  watch: {
  },
  async mounted () {
  },
  async created () {
    // await this.getPassword()
  }
}
</script>
