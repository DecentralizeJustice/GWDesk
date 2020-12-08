<template>
  <div>
    <v-card-title class="headline justify-center">
    Closing Remarks
    </v-card-title>
    <v-divider/>

    <component
    class="pa-5"
    v-bind:is="audioComp"
    v-bind:audioMuted='audioMuted'
    v-bind:audioFiles='audioFiles'/>
  </div>
</template>

<script>
import audio1 from '@/components/gameShow/localAudioEncrypt.vue'
import axios from 'axios'
export default {
  props: ['genInfo', 'currentTime', 'audioMuted'],
  components: {
    audio1
  },
  data: () => ({
    audioComp: audio1,
    passwordInfo: {}
  }),
  computed: {
    audioFiles: function () {
      return { audio: this.genInfo.outro.audio, imgFiles: this.genInfo.outro.img }
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
    await this.getPassword()
  }
}
</script>
