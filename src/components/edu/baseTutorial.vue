<template>
  <v-card>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
    <v-divider/>
    <v-row align="center">
     <v-col cols='10' offset='1'>
       <v-progress-linear
         :value='progress'
         color="blue-grey"
         height="16"
       >
         <template v-slot="{ value }">
           <strong>{{ Math.ceil(value) }}%</strong>
         </template>
       </v-progress-linear>
     </v-col>
    </v-row>
      <vidComp
      v-on:back='back()'
      v-on:next='next()'
      v-on:exit='exit()'
      @click="exit()"
      v-bind:courseInfo="correctLessonInfo"
      v-bind:part='part'
      v-bind:done='done'
      :html='html'/>
    <v-divider/>
    <v-card-actions>
      <!-- <v-btn
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn> -->
    <v-btn
      color="red darken-1"
      @click="exit()"
    >
      Exit
    </v-btn>
    <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import vidComp from '@/components/edu/vid&NotesCompNoQuiz.vue'
export default {
  props: ['courseInfo'],
  data: () => ({
    part: 0
  }),
  components: {
    vidComp
  },
  computed: {
    correctLessonInfo: function () {
      let nextLesson
      const numberOfSlides = this.courseInfo.comp.slides.length
      if (this.part === numberOfSlides) {
        nextLesson = this.courseInfo.comp.nextLesson
      }
      const info = {
        slides: this.courseInfo.comp.slides[this.part],
        breakpoints: this.courseInfo.comp.breakpoints[this.part],
        audio: this.courseInfo.comp.audio[this.part],
        nextLesson: nextLesson
      }
      return info
    },
    html: function () {
      return this.courseInfo.comp.notes[this.part]
    },
    title: function () {
      return this.courseInfo.comp.title
    },
    progress: function () {
      const numberOfSlides = this.courseInfo.comp.slides.length
      return ((this.part + 1) / numberOfSlides) * 100
    },
    done: function () {
      const numberOfSlides = this.courseInfo.comp.slides.length
      if (numberOfSlides === this.part + 1) {
        return true
      }
      return false
    },
    mobile: function () {
      return this.courseInfo.comp.mobile
    },
    desktop: function () {
      return this.courseInfo.comp.desktop
    }
  },
  methods: {
    exit () {
      this.$emit('changeLesson', '')
    },
    next () {
      this.part = this.part + 1
    },
    back () {
      this.part = this.part - 1
    },
    backToVideo () {
      this.vid = true
    }
  },
  mounted () {
  }
}
</script>
