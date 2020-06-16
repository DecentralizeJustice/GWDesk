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
// import { version as currentAppVersion } from 'package.json'
const CHECK_FOR_UPDATE_PENDING = 'CHECK_FOR_UPDATE_PENDING'
const CHECK_FOR_UPDATE_SUCCESS = 'CHECK_FOR_UPDATE_SUCCESS'
const CHECK_FOR_UPDATE_FAILURE = 'CHECK_FOR_UPDATE_FAILURE'

// const DOWNLOAD_UPDATE_PENDING = 'DOWNLOAD_UPDATE_PENDING'
// const DOWNLOAD_UPDATE_SUCCESS = 'DOWNLOAD_UPDATE_SUCCESS'
// const DOWNLOAD_UPDATE_FAILURE = 'DOWNLOAD_UPDATE_FAILURE'
//
// const QUIT_AND_INSTALL_UPDATE = 'QUIT_AND_INSTALL_UPDATE'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
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
    ipcRenderer.send(CHECK_FOR_UPDATE_PENDING)
    ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event, updateInfo) => {
      // const version = updateInfo && updateInfo.version
      console.log(updateInfo)
      // if (version && version !== currentAppVersion) {
      //   // ipcRenderer.send(DOWNLOAD_UPDATE_PENDING)
      //   // Update your updateCheckLevel to DOWNLOAD in your state.
      //   console.log(' download pending')
      //   console.log(updateInfo)
      // } else {
      //   console.log('no updates found')
      // }
    })
    ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, () => {
      console.log('failed update')
    })
    this.start()
  }
}
</script>
  <style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
  </style>
