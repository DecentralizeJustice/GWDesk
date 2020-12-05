<template>
  <div>
    Loading
  </div>
</template>

<script>
export default {
  props: ['genInfo'],
  components: {
  },
  data: () => ({
    currentTime: 1,
    done: false
  }),
  computed: {
    introLength: function () {
      return parseInt(this.genInfo.intro.length) * 1000
    },
    allQuestionsLength: function () {
      return (parseInt(this.genInfo.timeToAnswerGenQuestion) +
       parseInt(this.genInfo.explantionTime)) *
        1000 *
        parseInt(this.genInfo.numberOfQuestions)
    },
    status: function () {
      if (this.currentTime < this.startTime) {
        return 'loading'
      }
      if (this.currentTime < (this.startTime + this.introLength)) {
        return 'intro'
      }
      if (this.currentTime < (this.startTime + this.introLength + this.allQuestionsLength)) {
        return 'questions'
      }
      return 'outro'
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    }
  },
  methods: {
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
    // this.updateTime()
  }
}
</script>
