<template>
  <v-app>
    <navDrawer app/>
    <v-main>
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
            <updateWindow @downloadUpdate="downloadUpdate"
            v-bind:readyToShutdown="readyToShutdown"
            v-bind:updateAvailable="updateAvailable"
            v-bind:updateStarted='updateStarted'/>
          </v-dialog>
    </v-main>
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
      await this.$router.push({ path: 'edu' })
    },
    async downloadUpdate () {
      console.log('update download started')
      ipcRenderer.send('DOWNLOAD_UPDATE_PENDING')
      this.updateStarted = true
      ipcRenderer.on('DOWNLOAD_UPDATE_SUCCESS', () => {
        console.log('update Downloaded')
      })
      ipcRenderer.on('DOWNLOAD_UPDATE_FAILURE', (err) => {
        console.log('update download failed')
        console.log(err)
      })
    }
  },
  computed: {
  },
  data: () => ({
    updateAvailable: false,
    readyToShutdown: false,
    updateStarted: false
  }),
  async mounted () {
    this.start()
    if (process.env.NODE_ENV !== 'development') {
      ipcRenderer.send('CHECK_FOR_UPDATE_PENDING')
      ipcRenderer.on('CHECK_FOR_UPDATE_SUCCESS', (event, updateInfo) => {
        const version = updateInfo.version
        if (version && version !== appVersion) {
          this.updateAvailable = true
        }
      })
      ipcRenderer.on('CHECK_FOR_UPDATE_FAILURE', () => {
        console.log('failed update')
      })
      // ipcRenderer.on('DOWNLOAD_UPDATE_SUCCESS', () => {
      //   this.readyToShutdown = true
      //   console.log('donwload-sucess')
      // })
      ipcRenderer.on('DOWNLOAD_UPDATE_FAILURE', (event, err) => {
        console.log('download failed')
        console.log(err)
      })
    }
  }
}
</script>
  <style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
  </style>
