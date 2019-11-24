<template>
  <v-app>
    <navDrawer app v-if='mainReady'/>
    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import navDrawer from '@/components/navDrawer.vue'
import { startNode } from '@/assets/util/nodeUtil.js'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('stageInfo')
export default {
  name: 'App',
  components: {
    navDrawer
  },
  methods: {
    async start () {
      await startNode()
      console.log('node started')
    }
  },
  computed: {
    ...mapGetters({
      currentStage: 'currentStage'
    }),
    mainReady: function () {
      if (this.currentStage === 'main') {
        return true
      } else {
        return false
      }
    }
  },
  data: () => ({
    //
  }),
  async created () {
    this.start()
  }
}
</script>
