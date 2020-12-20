<template>
  <v-navigation-drawer
    expand-on-hover
    permanent
    app
    @transitionend="mouseOver"
  >
    <template v-slot:prepend >
      <v-list>
        <v-list-item
        class="px-2"
        >
              <v-list-item-avatar>
                <img src="/../../icon.png">
              </v-list-item-avatar>
            <v-list-item-title class="headline">Guiding Wallet</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
    <v-divider></v-divider>
    <v-list
      nav
      dense
    >
      <v-list-item link v-for="(title, index) in options"
        :key="`title-${index}`" v-on:click="navigate(title)"
        style=""
      >
        <v-list-item-icon >
          <v-icon>mdi-{{icons[title]}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="subtitle-1" >
          {{title}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    devOptions: [
      'Announcements', 'Trivia Show', 'Courses', 'Lessons', 'Feedback', 'BTC Wallet', 'Settings', 'Dev Pannel'
    ],
    prodOptions: [
      'Announcements', 'Trivia Show', 'Courses', 'Lessons', 'Feedback', 'BTC Wallet', 'Settings'
    ],
    icons: {
      Feedback: 'comment-quote',
      Lessons: 'book-open-page-variant',
      Courses: 'book-open-variant',
      'BTC Wallet': 'lock',
      'Dev Pannel': 'hammer-wrench',
      Settings: 'settings',
      Announcements: 'bullhorn',
      'Trivia Show': 'head-question'
    },
    routerLinks: {
      Announcements: 'announce',
      Courses: 'courses',
      Feedback: 'feedback',
      Lessons: 'lessons',
      Settings: 'settings',
      'BTC Wallet': 'btcSinglesig',
      'Dev Pannel': 'devPannel',
      'Trivia Show': 'gameShow'
    },
    open: false
  }),
  methods: {
    navigate (title) {
      const currentRoute = this.$router.currentRoute.name
      const desiredRoute = this.routerLinks[title]
      if (currentRoute !== desiredRoute) {
        this.$router.push(desiredRoute)
      }
    },
    mouseOver (event) {
      this.open = !this.open
    }
  },
  computed: {
    options: function () {
      if (process.env.NODE_ENV === 'development') {
        return this.devOptions
      }
      return this.prodOptions
    }
  }

  // async mounted () {
  // }
}
</script>
