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
                <v-img :src="`${publicPath}icon.png`"></v-img>
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
  name: 'App',
  components: {
  },
  data: () => ({
    publicPath: process.env.BASE_URL,
    devOptions: [
      'Courses', 'Dev Pannel'//, 'BTC Multisig'
    ],
    prodOptions: [
      'Courses'
    ],
    icons: {
      Courses: 'book-open-page-variant',
      'BTC Multisig': 'lock',
      'Dev Pannel': 'hammer-wrench'
    },
    routerLinks: {
      Courses: 'edu',
      'BTC Multisig': 'btcMusig',
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
