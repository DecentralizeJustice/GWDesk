<template>
  <div>
    <v-card-title class="headline justify-center">
    Welcome
    </v-card-title>
    <v-divider/>
    <audio1
    class='ma-5'
    v-bind:audioMuted='audioMuted'
    v-bind:audioFiles='audioFiles'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='mediaInfo'/>
    <v-row no-gutters align-content='center' justify='center' class="mt-4">
      <v-col cols='6' class="mb-5">
      <div class="mb-3 text-h6">First Question In:</div>
      <v-progress-linear
        color="light-blue"
        height="10"
        :value="value"
        striped
      ></v-progress-linear>
    </v-col>
    </v-row>
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
      const intro = this.mediaInfo.intro
      return { audio: intro.audio, imgFiles: intro.img }
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    },
    introLength: function () {
      return parseInt(this.genInfo.intro.length) * 1000
    },
    endTime: function () {
      return this.startTime + this.introLength
    },
    value: function () {
      const topFract = this.currentTime - this.startTime
      const bottomFract = this.endTime - this.startTime
      const value = (topFract / bottomFract) * 100
      return value
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
