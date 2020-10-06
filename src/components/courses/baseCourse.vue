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
          <v-col cols='10'>
            <div class="text-center">
            <div class="text-h6 mb-3">
              Completed:
            </div>
            <v-progress-linear
              v-model="progress"
              height="25"
            >
              <strong>{{ Math.ceil(progress) }}%</strong>
            </v-progress-linear>
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
       <div class='frame'>
        <v-stepper
          v-model="step"
          vertical
        >
        <div v-for="(item, index) in lessons" :key="index" class="">
          <v-stepper-step
            :complete="step > index + 1"
            :step="index + 1"
            class="text-h6"
          >
            {{item.title}}
          </v-stepper-step>
          <v-stepper-content :step="index + 1">
            <v-row align="center" justify='space-around'>
              <v-col cols='8'>
                <v-img
                  :src="thumbnail"
                ></v-img>
              </v-col>
          </v-row>
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
      </div>
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
  v-on:exit="stop"/>
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
    progress () {
      return (this.step / this.courseInfo.comp.lessons.length) * 100
    },
    thumbnail () {
      return this.courseInfo.comp.lessons[this.step - 1].comp.thumbnail
    },
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
    stop (completed) {
      this.showEducation = false
      if (completed && (this.step !== this.lessons.length)) {
        this.step = this.step + 1
      }
    },
    exit () {
      this.$emit('exit')
    }
  },
  mounted () {
  }
}
</script>
<style>
.frame {
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, .5);
    max-height: 60vh;
}

.frame::-webkit-scrollbar {
    -webkit-appearance: none;
}

.frame::-webkit-scrollbar:vertical {
    width: 11px;
}

.frame::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: grey;
}
</style>
