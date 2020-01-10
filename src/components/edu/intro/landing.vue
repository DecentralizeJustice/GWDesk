<template>
  <v-card>
    <v-card-title class="headline justify-center">Intro To Cryptocurrency Course</v-card-title>
    <v-divider/>
    <v-row no-gutters justify-content='space-evenly'>
       <v-col :key="item.title" v-for="(item) in lessons" cols='6'>
         <v-card
           class="ma-3 green"
         >
         <v-card-title class="headline justify-center">
           {{item.title}}
         </v-card-title>
         <v-row >
          <v-col cols='2' offset='5'>
            <v-icon x-large color="black" class="">mdi-{{item.icon}}</v-icon>
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
        color="green darken-1"
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
      { title: 'Why Cryptocurrency?', icon: 'atom-variant', comp: 'whyCrypto' },
      { title: 'Why Bitcoin?', icon: 'lock' },
      { title: 'All About Wallets', icon: 'wallet' },
      { title: 'How Support Works', icon: 'bitcoin' },
      { title: 'All About Exchanges', icon: 'book-information-variant' },
      { title: 'Membership Information', icon: 'gamepad-variant' }
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
