<template>
  <v-card class="" >
    <component v-bind:is="currentComponent"
    v-bind:genInfo='genInfo'
    v-bind:currentTime='currentTime'
    v-bind:encrypted='encrypted'
    v-bind:mediaInfo='mediaInfo'
    v-bind:audioMuted='audioMuted'
    v-bind:questions='questions'
    v-bind:userIdInfo='userIdInfo'
    v-bind:eliminated='eliminated'
    v-bind:privateId='privateId'
    v-bind:type='type'
    v-on:eliminated='eliminated = true'/>
    <v-divider/>
    <v-card-actions>
      <v-btn
        color="red darken-1"
        @click="exit"
      >
        Quit Game
      </v-btn>
      <v-spacer/>
      <v-btn
        v-if='!audioMuted'
        large
        @click='mute'
        color="primary"
      >
      <v-icon left>
      mdi-volume-off
      </v-icon>
        Mute
      </v-btn>
      <v-btn
        v-if='audioMuted'
        large
        @click='mute'
        color="secondary"
      >
      <v-icon left>
      mdi-volume-high
      </v-icon>
        UnMute
      </v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import intro from '@/components/gameShow/intro.vue'
import preGame from '@/components/gameShow/preGame.vue'
import quiz from '@/components/gameShow/quiz.vue'
import outro from '@/components/gameShow/outro.vue'
import humanVerif from '@/components/gameShow/humanVerification.vue'
export default {
  name: 'question',
  props: ['genInfo', 'mediaInfo', 'encrypted', 'questions', 'userIdInfo', 'privateId', 'type'],
  components: {
    intro,
    preGame,
    quiz,
    outro,
    humanVerif
  },
  data: () => ({
    currentTime: 1,
    done: false,
    audioMuted: false,
    eliminated: false
  }),
  computed: {
    introLength: function () {
      return parseInt(this.genInfo.intro.length) * 1000
    },
    humanVerificationTime: function () {
      return parseInt(this.genInfo.humanVerificationTime) * 1000
    },
    allQuestionsLength: function () {
      return (parseInt(this.genInfo.timeToAnswerGenQuestion) +
       parseInt(this.genInfo.explantionTime)) *
        1000 *
        parseInt(this.genInfo.numberOfQuestions)
    },
    currentComponent: function () {
      if (this.currentTime < this.startTime) {
        return preGame
      }
      if (this.currentTime < (this.startTime + this.introLength)) {
        return intro
      }
      if (this.currentTime < (this.startTime + this.introLength + this.humanVerificationTime)) {
        return humanVerif
      }
      if (this.currentTime < (this.startTime + this.humanVerificationTime + this.introLength + this.allQuestionsLength)) {
        return quiz
      }
      return outro
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    }
  },
  methods: {
    mute: function () {
      if (this.audioMuted) {
        this.audioMuted = false
        return
      }
      this.audioMuted = true
    },
    exit: function () {
      this.done = true
      this.$emit('exit')
    },
    updateTime () {
      if (!this.done) {
        setTimeout(() => {
          this.currentTime = Date.now()
          this.updateTime()
        }, 500)
      }
    }
  },
  watch: {
  },
  async mounted () {
    this.updateTime()
  }
}
</script>
