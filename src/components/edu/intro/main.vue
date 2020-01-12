<template>
  <component
  v-bind:is="currentMain"
  v-on:exit="exit()"
  v-on:changeLesson="changeLesson"/>
</template>
<script>
export default {
  data: () => ({
    lesson: ''
  }),
  computed: {
    currentMain () {
      if (this.lesson === '') {
        return () => import('@/components/edu/intro/landing.vue')
      }
      const componentName = this.lesson
      return () => import(`@/components/edu/intro/${componentName}.vue`)
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
