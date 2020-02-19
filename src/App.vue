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
// import { startNode } from '@/assets/util/nodeUtil.js'
// import { createNamespacedHelpers } from 'vuex'
// const { mapGetters } = createNamespacedHelpers('stageInfo')
export default {
  name: 'App',
  components: {
    navDrawer
  },
  methods: {
    async start () {
      if (!this.$router.currentRoute.name === 'edu') {
        this.$router.push({ path: 'edu' })
      }
    }
  },
  computed: {
    // ...mapGetters({
    //   currentStage: 'currentStage'
    // }),
    // mainReady: function () {
    //   if (this.currentStage === 'main') {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
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
