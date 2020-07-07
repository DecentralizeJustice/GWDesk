<template>
  <component
  :key='lesson'
  v-bind:is="currentMain"
  v-bind:courseInfo="courseInfo"
  v-bind:landingInfo='landingInfo'
  v-on:exit="exit()"
  v-on:changeLesson="changeLesson"/>
</template>
<script>
import welcome from '@/assets/courseData/courses/intro/welcome.js'
import whyCrypto from '@/assets/courseData/courses/intro/whyCrypto.js'
import whichCrypto from '@/assets/courseData/courses/intro/whichCrypto.js'
import landing from '@/components/edu/landing.vue'
import baseCourse from '@/components/edu/baseCourse.vue'
export default {
  data: () => ({
    lesson: '',
    landingInfo: {
      title: 'Intro To Cryptocurrency',
      lessons: [
        { title: 'Welcome to GW!', icon: 'cake', comp: 'welcome', unlocked: true, first: true },
        { title: 'What is Cryptocurrency?', icon: 'atom-variant', comp: 'whyCrypto', unlocked: true },
        { title: 'Which Crypto is Best?', icon: 'account-question', comp: 'whichCrypto', unlocked: true },
        { title: 'How to store Crypto', icon: 'calculator', unlocked: false },
        { title: 'How To Buy Crypto', icon: 'account-cash', unlocked: false }
      ]
    }

  }),
  computed: {
    courseInfo () {
      if (this.lesson === 'whichCrypto') {
        return whichCrypto
      }
      if (this.lesson === 'whyCrypto') {
        return whyCrypto
      }
      if (this.lesson === 'welcome') {
        return welcome
      }
      return true
    },
    currentMain () {
      if (this.lesson === '') {
        return landing
      }
      return baseCourse
    }
  },
  methods: {
    exit () {
      this.$emit('exit')
    },
    changeLesson (lesson) {
      this.lesson = lesson
    }
  }
}
</script>
