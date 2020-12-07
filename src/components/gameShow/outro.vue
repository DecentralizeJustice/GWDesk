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
