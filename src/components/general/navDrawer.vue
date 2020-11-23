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
      'Courses', 'Lessons', 'Feedback', 'BTC Single', 'Settings', 'Dev Pannel'
    ],
    prodOptions: [
      'Courses', 'Lessons', 'Feedback'
    ],
    icons: {
      Feedback: 'comment-quote',
      Lessons: 'book-open-page-variant',
      Courses: 'book-open-variant',
      'BTC Single': 'lock',
      'Dev Pannel': 'hammer-wrench',
      Settings: 'settings'
    },
    routerLinks: {
      Courses: 'courses',
      Feedback: 'feedback',
      Lessons: 'lessons',
      Settings: 'settings',
      'BTC Single': 'btcSinglesig',
      'Dev Pannel': 'devPannel'
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
