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
import baseLesson from '@/components/edu/baseLesson.vue'
import baseTutorial from '@/components/edu/baseTutorial.vue'
export default {
  props: ['landingInfo', 'setLesson'],
  data: () => ({
    lesson: ''
  }),
  mounted () {
    if (typeof this.setLesson !== 'undefined') {
      // this.changeLesson(this.setLesson)
    }
  },
  computed: {
    currentMain () {
      if (this.lesson === '') {
        return landing
      }
      if (this.landingInfo.lessons[this.lesson].comp.tutorial) {
        return baseTutorial
      }
      return baseLesson
    },
    courseInfo () {
      return this.landingInfo.lessons[this.lesson]
    }
  },
  methods: {
    exit () {
      if (this.lesson === '') {
        this.$emit('exit')
      } else {
        this.lesson = ''
      }
    },
    changeLesson (lesson) {
      this.lesson = lesson
    }
  }
}
</script>
