<template>
  <v-app>
    <navDrawer app/>
    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
          <v-dialog
            v-model="updateAvailable"
            width="800"
            persistent
            overlay-opacity='90'
            class="text-center"
          >
            <updateWindow @shutdown="shutdownAndInstall"
            v-bind:readyToShutdown="readyToShutdown"/>
          </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import navDrawer from '@/components/general/navDrawer.vue'
import updateWindow from '@/components/general/update.vue'
const appVersion = require('../package.json').version
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
export default {
  name: 'App',
  components: {
    navDrawer,
    updateWindow
  },
  methods: {
    async start () {
      try {
        await this.$router.push({ path: 'edu' })
      } catch (err) {
      }
    },
    async shutdownAndInstall () {
      ipcRenderer.send('QUIT_AND_INSTALL_UPDATE')
    }
  },
  computed: {
  },
  data: () => ({
    updateAvailable: false,
    readyToShutdown: false
  }),
  async mounted () {
    if (process.env.NODE_ENV === 'development') {
    } else {
      ipcRenderer.send('CHECK_FOR_UPDATE_PENDING')
      ipcRenderer.on('CHECK_FOR_UPDATE_SUCCESS', (event, updateInfo) => {
        const version = updateInfo.version
        if (version && version !== appVersion) {
          ipcRenderer.send('DOWNLOAD_UPDATE_PENDING')
          this.updateAvailable = true
        }
      })
      ipcRenderer.on('CHECK_FOR_UPDATE_FAILURE', () => {
        console.log('failed update')
      })
      ipcRenderer.on('DOWNLOAD_UPDATE_SUCCESS', () => {
        this.readyToShutdown = true
      })
      ipcRenderer.on('DOWNLOAD_UPDATE_FAILURE', (err) => {
        console.log('download failed')
        console.log(err)
      })
    }
    this.start()
  }
}
</script>
  <style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
  </style>
