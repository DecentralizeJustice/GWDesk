<template>
  <v-row no-gutters align-content='center' justify='center'>
    <v-col
      cols="10"
    >
    <v-card class="" >
      <v-card-title class="headline justify-center">
        Announcements
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters align-content='center' justify='space-around' class="pa-5">
        <v-col
          cols="4"
        >
        <v-card class="" color='grey darken-2'>
          <v-card-title class="headline justify-center">
            New Education
          </v-card-title>
          <v-divider/>
          <v-col :key="item.title" v-for="(item) in lessons" cols='12'>
            <v-card
              class="ma-3" :color="cardColor(true)"
            >
            <p class="headline justify-center text-wrap text-center pa-3">
              {{item.title}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large :color="iconColor(true)">
                   mdi-{{item.icon}}
                 </v-icon>
               </v-col>
             </v-row>
             <v-btn
               color="secondary"
               @click='goToRoute(item.routeInfo)'
               class="mt-2"
               v-if='item.routeInfo'
             >
               Take Lesson
             </v-btn>
            </p>
            </v-card>
          </v-col>
        </v-card>
        </v-col>
        <v-col
          cols="4"
        >
        <v-card class="" color='grey darken-2'>
          <v-card-title class="headline justify-center">
            General Updates
          </v-card-title>
          <v-divider/>
          <v-col :key="item.title" v-for="(item) in genUpdates" cols='12'>
            <v-card
              class="ma-3" :color="cardColor(false)"
            >
            <p class="headline justify-center text-wrap text-center pa-3">
              {{item.title}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large :color="iconColor(false)">
                   mdi-{{item.icon}}
                 </v-icon>
               </v-col>
             </v-row>
             <v-btn
               color="secondary"
               @click='goToRoute(item.routeInfo)'
               class="mt-2"
               v-if='item.routeInfo'
             >
               Take Lesson
             </v-btn>
            </p>
            </v-card>
          </v-col>
        </v-card>
        </v-col>
      </v-row>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    lessons: [
      {
        title: 'Why You Need A Hardware Wallet',
        icon: 'deskphone',
        routeInfo: { name: 'lessons', params: { lessonCategory: 'Wallet', lesson: 1 } }
      }
    ],
    genUpdates: [
      {
        title: 'Testnet Wallet Released',
        icon: 'wallet',
        routeInfo: { name: 'lessons', params: { lessonCategory: 'Wallet', lesson: 0 } }
      }
    ]
  }),
  computed: {
  },
  methods: {
    goToRoute: function (routeInfo) {
      this.$router.push(routeInfo)
    },
    openDialog: function (section) {
      this.currentLesson = section
      this.dialog = true
    },
    cardColor (state) {
      if (state) {
        return 'blue darken-2'
      }
      return 'blue darken-2'
    },
    iconColor (state) {
      if (state) {
        return 'indigo darken-3'
      }
      return 'indigo darken-3'
    }
  },
  async mounted () {
  }
}
</script>
