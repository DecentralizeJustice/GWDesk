<template>
  <v-app>
    <navDrawer app v-if='true'/>
    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import navDrawer from '@/components/navDrawer.vue'
export default {
  name: 'App',
  components: {
    navDrawer
  },
  methods: {
    async start () {
      this.$router.push({ path: 'edu' })
    }
  },
  computed: {
  },
  data: () => ({
    //
  }),
  async mounted () {
    this.start()
  }
}
</script>
  <style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
  </style>
