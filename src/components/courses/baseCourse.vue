<template>
  <v-card>
    <v-card-title class="headline justify-center">{{title}}</v-card-title>
    <v-divider/>
    <v-row align="center" justify='space-around'>
      <v-col cols='5'>
        <v-row align="center" justify='space-around' style='background:black;'>
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
              color="primary"
              @click="step = index + 2"
            >
              Continue
            </v-btn>
            <v-btn text @click="step = index">
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
</template>
<script>
export default {
  props: ['courseInfo'],
  data: () => ({
    step: 1
  }),
  components: {
  },
  computed: {
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
    }
  },
  methods: {
    exit () {
      this.$emit('changeLesson', '')
    },
    startQuiz () {
      this.vid = false
    },
    backToVideo () {
      this.vid = true
    },
    partDone () {
      if (this.currentComponent === 'congrats') {
        this.exit()
        return
      }
      this.part += 1
      this.backToVideo()
    }
  },
  mounted () {
    // console.log(this.courseInfo.comp)
  }
}
</script>
