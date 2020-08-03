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
import landing from '@/components/edu/landing.vue'
import baseCourse from '@/components/edu/baseCourse.vue'
export default {
  props: ['landingInfo'],
  data: () => ({
    lesson: ''
  }),
  computed: {
    currentMain () {
      if (this.lesson === '') {
        return landing
      }
      return baseCourse
    },
    courseInfo () {
      return this.landingInfo.lessons[this.lesson]
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
