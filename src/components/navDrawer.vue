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
          one-line
        >
          <v-list-item-content>
            <v-list-item-title class="title">Guiding Wallet</v-list-item-title>
          </v-list-item-content>
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
      >
        <v-list-item-icon >
          <v-icon>mdi-{{icons[title]}}</v-icon>
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
    devOptions: [
      'Education', 'BTC Multisig', 'Dev'
    ],
    prodOptions: [
      'Education'
    ],
    icons: {
      Education: 'book-open-page-variant',
      'BTC Multisig': 'lock',
      Dev: 'settings'
    },
    routerLinks: {
      Education: 'edu',
      'BTC Multisig': 'btcMusig',
      Dev: 'dev'
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
