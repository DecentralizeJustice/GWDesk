<template>
  <div>
    <component v-bind:is="audio"/>
  </div>
</template>

<script>
import audio1 from '@/components/gameShow/localAudioEncrypt.vue'
export default {
  props: ['genInfo'],
  components: {
    audio1
  },
  data: () => ({
  }),
  computed: {
    audio: function () {
      return audio1
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
