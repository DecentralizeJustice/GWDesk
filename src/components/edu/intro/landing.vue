<template>
  <v-card>
    <v-card-title class="headline justify-center">Intro To Cryptocurrency</v-card-title>
    <v-divider/>
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
             color="deep-purple accent-4"
             :disabled='!unlocked(item.unlocked)'
             @click="startLesson (item.comp)"
           >
             Start
           </v-btn>
         </v-card-actions>
         </v-card>
       </v-col>
    </v-row>
    <v-divider/>
    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <v-btn
        color="red darken-1"
        text
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
  data: () => ({
    componentList: {
    },
    lesson: '',
    lessons: [
      { title: 'What is Cryptocurrency?', icon: 'atom-variant', comp: 'whyCrypto', unlocked: 'true' },
      { title: 'Which Cryptocurrency is Best For Me?', icon: 'account-question', comp: 'whichCrypto', unlocked: 'true' },
      { title: 'Pick Your First Cryptocurrency', icon: 'account-cash', unlocked: 'false' }
    ]
  }),
  components: {
  },
  computed: {
    currentMain () {
      return () => import('@/components/edu/intro/landing.vue')
    }
  },
  methods: {
    cardColor (state) {
      if (state === 'true') {
        return 'blue'
      }
      return 'grey darken-4'
    },
    iconColor (state) {
      if (state === 'true') {
        return 'black'
      }
      return 'white'
    },
    unlocked (state) {
      if (state === 'true') {
        return true
      }
      return false
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
