<template>
  <component
  :key='lesson'
  v-bind:is="currentMain"
  v-bind:courseInfo="courseInfo"
  v-on:exit="exit()"
  v-on:changeLesson="changeLesson"/>
</template>
<script>
import whyCrypto from '@/assets/courseData/courses/intro/whyCrypto.js'
import whichCrypto from '@/assets/courseData/courses/intro/whichCrypto.js'
import landing from '@/components/edu/intro/landing.vue'
import baseCourse from '@/components/edu/intro/baseCourse.vue'
export default {
  data: () => ({
    lesson: ''
  }),
  computed: {
    courseInfo () {
      if (this.lesson === 'whichCrypto') {
        return whichCrypto
      }
      if (this.lesson === 'whyCrypto') {
        return whyCrypto
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
