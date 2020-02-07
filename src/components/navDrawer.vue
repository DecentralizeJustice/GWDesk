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
            <v-list-item-title class="title">Guide Wallet</v-list-item-title>
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
    <!-- <template v-slot:append >
        <v-list
          nav
          dense
        >
          <v-list-item
          >
            <v-list-item-icon >
              <v-icon large color="green darken-2">
                mdi-satellite-uplink
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Node Synced 100%</v-list-item-title>
          </v-list-item>
        </v-list>
      </template> -->
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    titles: [
      // 'Home', 'Balance', 'Receive Money', 'Send Money', 'Transactions',
      'Education', 'BTC Multisig', 'Dev'//, 'Support', 'Settings'
    ],
    icons: [
      // 'home', 'cash-usd', 'arrow-right-bold',
      // 'arrow-left-bold', 'history',
      'book-open-page-variant', 'lock',
      'settings'
    ],
    routerLinks: ['edu', 'btcMusig', 'dev' //, 'home', 'balance', 'receive', 'send', 'trans',
      // 'support', 'settings'
    ],
    open: false
  }),
  methods: {
    navigate (index) {
      const currentRoute = this.$router.currentRoute.name
      const desiredRoute = this.routerLinks[index]
      if (currentRoute !== desiredRoute) {
        this.$router.push(desiredRoute)
      }
    },
    mouseOver (event) {
      this.open = !this.open
    }
  }
}
</script>
