<template>
  <v-app>
    <navDrawer app />
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
  data: () => ({
    //
  }),
  async created () {
    this.start()
  }
}
</script>
