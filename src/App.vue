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
const { autoUpdater } = require('electron-updater')
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
    autoUpdater.checkForUpdates()
    autoUpdater.on('checking-for-update', () => {
      console.log('Checking for updates !!')
    })
    autoUpdater.on('update-available', () => {
      console.log('checked')
    })
    this.start()
  }
}
</script>
  <style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
  </style>
