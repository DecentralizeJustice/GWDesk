<template>
  <audio ref="player1223" hidden autoplay
    :src="gameMusic" type="audio/mpeg" @error='audioError' :muted='audioMuted'>
  </audio>
</template>

<script>
import gameMusic from '@/assets/gameShow/files/shortQuestionMusic.mp3'
export default {
  components: {
  },
  props: ['audioMuted'],
  data () {
    return {
      player: '',
      gameMusic: gameMusic
    }
  },
  methods: {
    audioError (e) {
      console.log(e.srcElement.error)
    }
  },
  computed: {
  },
  watch: {
    audioMuted: function () {
      this.player.muted = this.audioMuted
    }
  },
  async mounted () {
    this.player = this.$refs.player1223
    this.player.muted = this.audioMuted
  }
}
</script>
