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
import navDrawer from '@/components/general/navDrawer.vue'
export default {
  name: 'App',
  components: {
    navDrawer
  },
  methods: {
    async start () {
      try {
        await this.$router.push({ path: 'edu' })
      } catch (err) {
      }
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
