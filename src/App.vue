<template>
  <v-app>
    <navDrawer app v-if='navBarvisible'/>
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
import store from './store/index.js'
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
    navBarvisible: function () {
      const mainReady = store.state.stageInfo.main
      return mainReady
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
