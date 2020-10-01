<template>
  <div>
  <v-card v-if='!showEducation'>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
    <v-divider/>
    <v-row align="center" justify='space-around'>
      <v-col cols='5'>
        <v-card
          elevation="2"
          color="grey darken-3"
        >
        <v-row align="center" justify='space-around'>
          <v-col cols='10'>
            <div class="text-h6">
              Summary:
            </div>
            <div class="text-body-1">
              {{about}}
            </div>
          </v-col>
          <v-col cols='10'>
            <div class="text-h6">
              Made For: <br>
            </div>
            <div class="text-body-1">
              {{whofor}}
            </div>
          </v-col>
          <v-col cols='10'>
            <div class="text-h6">
              Estimated Time: <br>
            </div>
            <div class="text-body-1">
              {{time}}
            </div>
          </v-col>
          <!-- <v-col cols='6'>
            <v-btn color="primary">
              More Info
            </v-btn>
          </v-col> -->
        </v-row>
        </v-card>
      </v-col>
     <v-col cols='6'>
        <v-stepper
          v-model="step"
          vertical
        >
        <div v-for="(item, index) in lessons" :key="index" class="">
          <v-stepper-step
            :complete="step > index + 1"
            :step="index + 1"

          >
            {{item.title}}
          </v-stepper-step>
          <v-stepper-content :step="index + 1">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn
              @click='startEducation()'
              color="green" class="mr-2"
            >
              Start Lesson
            </v-btn>
            <v-btn
              color="cyan darken-4"
              class="mr-2"
              @click="step = index + 2"
              v-if='step !== lessons.length'
            >
              Skip
            </v-btn>
            <v-btn color="red"
              class="mr-2"
              @click="step = index"
              v-if='step !== 1'>
              Back
            </v-btn>
          </v-stepper-content>
          <v-divider
            vertical
          ></v-divider>
        </div>
        </v-stepper>
     </v-col>
    </v-row>
  <v-divider/>
  <v-card-actions>
    <v-btn
      color="red darken-1"
      @click="exit()"
    >
      Exit
    </v-btn>
    <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
  <component
  v-if='showEducation'
  style='overflow-x: hidden !important;'
  v-bind:is="currentEducation"
  v-bind:courseInfo="currentLesson"
  v-on:changeLesson="stop()"/>
</div>
</template>
<script>
import baseLesson from '@/components/edu/baseLesson.vue'
import baseTutorial from '@/components/edu/baseTutorial.vue'
export default {
  props: ['courseInfo'],
  data: () => ({
    step: 1,
    currentComponent: '',
    showEducation: false
  }),
  components: {
  },
  computed: {
    currentEducation () {
      if (this.currentLesson.comp.tutorial) {
        return baseTutorial
      }
      return baseLesson
    },
    about: function () {
      return this.courseInfo.comp.about
    },
    title: function () {
      return this.courseInfo.comp.title
    },
    whofor: function () {
      return this.courseInfo.comp.for
    },
    time: function () {
      return this.courseInfo.comp.time
    },
    lessons: function () {
      return this.courseInfo.comp.lessons
    },
    currentLesson: function () {
      return this.courseInfo.comp.lessons[this.step - 1]
    }
  },
  methods: {
    startEducation () {
      this.showEducation = true
    },
    stop () {
      this.showEducation = false
    },
    exit () {
      this.$emit('changeLesson', '')
    }
  },
  mounted () {
  }
}
</script>
