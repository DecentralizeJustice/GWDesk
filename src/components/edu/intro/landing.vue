<template>
  <v-card>
    <v-card-title class="headline justify-center">Intro To Cryptocurrency Use Course</v-card-title>
    <v-divider/>
    <v-row no-gutters justify-content='space-evenly'>
       <v-col :key="item.title" v-for="(item) in lessons" cols='6'>
         <v-card
           class="ma-3 green"
         >
         <v-card-title class="headline justify-center">
           {{item.title}}
         </v-card-title>

         <v-row no-gutters justify-content='center' >
          <v-col cols='2' offset='5' class="justify-center text-center">
            <v-icon x-large color="black" class="" style="">
              mdi-{{item.icon}}
            </v-icon>
          </v-col>
        </v-row>
         <v-card-actions class="justify-center">
           <v-btn
             color="deep-purple accent-4"
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
      { title: 'Which Cryptocurrency should I use?', icon: 'lock', unlocked: 'true' },
      { title: 'How To Store Cryptocurrency', icon: 'wallet', unlocked: 'true' },
      // { title: 'How Support Works', icon: 'bitcoin' },
      { title: 'How To Buy Cryptocurrency', icon: 'book-information-variant', unlocked: 'true' }
      // { title: 'Membership Information', icon: 'gamepad-variant' }
    ]
  }),
  components: {
  },
  computed: {
    currentMain () {
      // const currentStage = this.currentStage
      const componentName = 'landing'
      return () => import(`@/components/edu/intro/${componentName}.vue`)
    }
  },
  methods: {
    exit () {
      this.$emit('exit')
    },
    startLesson (lesson) {
      this.$emit('changeLesson', lesson)
    }
  }
}
</script>
