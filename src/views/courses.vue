<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters">
        <v-card-title class="headline justify-center">
          Courses
        </v-card-title>
            <v-divider></v-divider>
            <v-row no-gutters justify-content='space-evenly'>
               <v-col :key="item.title" v-for="(item) in lessons" cols='4'>
                 <v-card
                   class="ma-3" :color="cardColor(item.unlocked)"
                 >
                 <v-card-title class="headline justify-center">
                   {{item.title}}
                 </v-card-title>
                 <v-row no-gutters justify-content='center' >
                  <v-col cols='2' offset='5' class="justify-center text-center">
                    <v-icon x-large :color="iconColor(item.unlocked)" class="" style="">
                      mdi-{{item.icon}}
                    </v-icon>
                  </v-col>
                </v-row>
                 <v-card-actions class="justify-center">
                   <v-btn
                     :disabled='!item.unlocked'
                     :color="iconColor(true)"
                     @click.stop="openDialog(item.title)"
                   >
                     Start
                   </v-btn>
                 </v-card-actions>
                 </v-card>
               </v-col>
            </v-row>
            <!-- <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
    >
    <subjectHome
    v-bind:landingInfo="landingInfoPicker"
    v-bind:setLesson="this.routeInfo.lesson"
    v-on:exit="dialog = false"/>
    </v-dialog>
    </v-layout>
</template>

<script>
import subjectHome from '@/components/courses/courseSubjectHome.vue'
import begginnerLandingInfo from '@/assets/courses/landinginfo/intro.js'
export default {
  mounted () {
    if (typeof this.routeInfo.course !== 'undefined') {
      this.openDialog(this.routeInfo.course)
    }
  },
  components: {
    subjectHome
  },
  props: ['routeInfo'],
  data: () => ({
    dialog: false,
    currentLesson: '',
    lessonMapping: {
      'Beginner To Crypto': begginnerLandingInfo
    },
    lessons: [
      { title: 'Beginner To Crypto', icon: 'atom-variant', unlocked: true }
    ]
  }),
  methods: {
    openDialog: function (section) {
      this.currentLesson = section
      this.dialog = true
    },
    cardColor (state) {
      if (state) {
        return 'blue'
      }
      return 'grey darken-3'
    },
    iconColor (state) {
      if (state) {
        return 'indigo darken-4'
      }
      return 'white'
    }
  },
  computed: {
    landingInfoPicker () {
      return this.lessonMapping[this.currentLesson]
    }
  }
}
</script>
