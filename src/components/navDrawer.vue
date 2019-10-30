<template>
  <v-navigation-drawer
    expand-on-hover
    permanent
    app
  >
    <template v-slot:prepend>
      <v-list>
        <v-list-item
          one-line
        >
          <v-list-item-content>
            <v-list-item-title class="title">Distributed Keys</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
    <v-divider></v-divider>
    <v-list
      nav
      dense
    >
      <v-list-item link v-for="(title, index) in titles"
        :key="`title-${index}`" v-on:click="navigate(index)"
      >
        <v-list-item-icon >
          <v-icon>mdi-{{icons[index]}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{title}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    titles: [
      'Home', 'Transactions', 'Receive Money', 'Send Money',
      'Lessons', 'Support', 'Settings'
    ],
    icons: ['home', 'wallet', 'arrow-right-bold',
      'arrow-left-bold', 'book-open-outline', 'face-agent',
      'settings'
    ],
    routerLinks: ['home', 'trans', 'receive', 'send', 'lessons',
      'support', 'settings'
    ]
  }),
  methods: {
    navigate (index) {
      const currentRoute = this.$router.currentRoute.name
      const desiredRoute = this.routerLinks[index]
      if (currentRoute !== desiredRoute) {
        this.$router.push(desiredRoute)
      }
    }
  }
}
</script>
