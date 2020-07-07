<template>
  <v-card>
    <v-card-title class="headline justify-center">{{landingInfo.title}}</v-card-title>
    <v-divider/>
    <v-row no-gutters>
       <v-col :key="item.title" v-for="(item) in landingInfo.lessons" cols='4'>
         <v-card
           class="ma-3" :color="cardColor(item.unlocked)"
         >
         <v-card-title class="headline justify-center text-center" style="word-break: normal;">
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
             :color="iconColor(true)"
             :disabled='!item.unlocked'
             @click="startLesson (item.comp)"
           >
             {{buttonText(item.first)}}
           </v-btn>
         </v-card-actions>
         </v-card>
       </v-col>
    </v-row>
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
export default {
  props: ['landingInfo'],
  data: () => ({
  }),
  components: {
  },
  computed: {
  },
  methods: {
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
    },
    buttonText (first) {
      if (first) {
        return 'Start Here'
      }
      return 'Take Lesson'
    },
    exit () {
      this.$emit('exit')
    },
    startLesson (lesson) {
      this.$emit('changeLesson', lesson)
    }
  }
}
</script>
