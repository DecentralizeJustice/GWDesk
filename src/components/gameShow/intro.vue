<template>
  <div>
    <v-card-title class="headline justify-center">
    Welcome
    </v-card-title>
    <v-divider/>
    <component v-bind:is="audioComp"
    v-bind:audioMuted='audioMuted'
    v-bind:audioFiles='audioFiles'/>
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
export default {
  props: ['genInfo', 'currentTime', 'audioMuted'],
  components: {
    audio1
  },
  data: () => ({
    audioComp: audio1
  }),
  computed: {
    audioFiles: function () {
      return { audio: this.genInfo.intro.audio, imgFiles: this.genInfo.intro.img }
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
  },
  watch: {
  },
  async mounted () {
  }
}
</script>
