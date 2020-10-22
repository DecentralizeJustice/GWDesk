<template>
  <v-app>
    <navDrawer app/>
    <v-main>
      <transition name="fade">
        <router-view/>
      </transition>
          <v-dialog
            v-model="showDialog"
            width="800"
            persistent
            overlay-opacity='90'
            class="text-center"
          >
            <updateWindow @downloadUpdate='downloadUpdate'
            v-bind:readyToShutdown="readyToShutdown"
            v-bind:updateAvailable="updateAvailable"
            v-bind:updateStarted='updateStarted'
            v-bind:torReady='torReady'/>
          </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import navDrawer from '@/components/general/navDrawer.vue'
import updateWindow from '@/components/general/update.vue'
import { dormant, circuitEstablished } from '@/assets/util/tor.js'
import {
  hardStopDeamon
} from '@/assets/util/btc/electrum/general.js'
const appVersion = require('../package.json').version
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const isDevelopment = process.env.NODE_ENV !== 'production'
const R = require('ramda')
export default {
  name: 'App',
  components: {
    navDrawer,
    updateWindow
  },
  data: () => ({
    waitTime: 5,
    torReady: false,
    torDormant: false,
    torCircuitReady: false,
    updateAvailable: false,
    readyToShutdown: false,
    updateStarted: false
  }),
  methods: {
    shouldUpdate: function (downloadVersion, currentVersion) {
      const downloadVersionArray = downloadVersion.split('.').map(e => parseInt(e))
      const currentVersionArray = currentVersion.split('.').map(e => parseInt(e))
      if (R.equals(downloadVersionArray, currentVersionArray)) {
        return false
      }
      for (var i = 0; i < downloadVersionArray.length; i++) {
        if (downloadVersionArray[i] > currentVersionArray[i]) {
          return true
        }
        if (downloadVersionArray[i] < currentVersionArray[i]) {
          return false
        }
      }
      return true
    },
    loop: async function () {
      if (isDevelopment || this.torDormant || this.torCircuitReady) {
        this.torReady = true
        return true
      } else {
        this.dormantb()
        this.circuitEstablishedb()
        await this.sleep(this.waitTime * 1000)
        await this.loop()
      }
    },
    dormantb: function () {
      ipcRenderer.on('dormant34', (event, message) => {
        const status = message.dormant
        if (status === '1\n') {
          this.torDormant = true
        }
      })
      dormant()
    },
    circuitEstablishedb: function () {
      ipcRenderer.on('circuitEstablished34', (event, message) => {
        const status = message.circuitEstablished
        if (status === '1\n') {
          console.log('circuit ready')
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
        await this.$router.push(
          {
            name: 'courses'
          })
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
    showDialog: function () {
      return !this.torReady || this.updateAvailable
    }
  },
  async mounted () {
    this.start()
    await hardStopDeamon()
    await this.loop()
    if (process.env.NODE_ENV !== 'development') {
      ipcRenderer.send('CHECK_FOR_UPDATE_PENDING')
      ipcRenderer.on('CHECK_FOR_UPDATE_SUCCESS', (event, updateInfo) => {
        const version = updateInfo.version
        const updateReady = this.shouldUpdate(version, appVersion)
        if (version && updateReady) {
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
