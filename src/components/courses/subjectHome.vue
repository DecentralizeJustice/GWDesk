<template>
  <component
  style='overflow-x: hidden !important;'
  :key='lesson'
  v-bind:is="currentMain"
  v-bind:courseInfo="courseInfo"
  v-bind:landingInfo='landingInfo'
  v-on:exit="exit()"
  v-on:changeLesson="changeLesson"/>
</template>
<script>
import landing from '@/components/edu/landing.vue'
import baseCourse from '@/components/courses/baseLesson.vue'
export default {
  props: ['landingInfo', 'setLesson'],
  data: () => ({
    lesson: ''
  }),
  mounted () {
    if (typeof this.setLesson !== 'undefined') {
      this.changeLesson(this.setLesson)
    }
  },
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
