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
            <updateWindow @downloadUpdate='downloadUpdate'
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
import { dormant, circuitEstablished } from '@/assets/util/tor.js'
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
    loop: async function () {
      if (this.torDormant || this.torCircuitReady) {
        this.torReady = true
        console.log('ready to go')
      } else {
        console.log('ran again')
        this.dormantb()
        this.circuitEstablishedb()
        await this.sleep(this.waitTime * 1000)
        this.loop()
      }
    },
    dormantb: function () {
      ipcRenderer.on('dormant', (event, message) => {
        if (message === '1\n') {
          this.torDormant = true
        }
      })
      dormant()
    },
    circuitEstablishedb: function () {
      ipcRenderer.on('circuitEstablished', (event, message) => {
        if (message === '1\n') {
          this.torCircuitReady = true
        }
      })
      circuitEstablished()
    },
    sleep: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async start () {
      try {
        await this.$router.push({ path: 'edu' })
      } catch (err) {
      }
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
    waitTime: 10,
    torReady: false,
    torDormant: false,
    torCircuitReady: false,
    updateAvailable: false,
    readyToShutdown: false,
    updateStarted: false
  }),
  async mounted () {
    this.start()
    this.loop()
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
