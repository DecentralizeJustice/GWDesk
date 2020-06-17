<template>
  <v-app>
    <navDrawer app v-if='true'/>
    <v-content>
      <transition name="fade">
        <v-if='!updateAvailable' router-view/>
        <div class="text-center">
          <v-dialog
            v-model="updateAvailable"
            width="500"
          >
            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                Privacy Policy
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  v-on:click="shutdownAndInstall()"
                  v-if='readyToShutdown'
                >
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  </div>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import navDrawer from '@/components/general/navDrawer.vue'
const appVersion = require('../package.json').version
const CHECK_FOR_UPDATE_PENDING = 'CHECK_FOR_UPDATE_PENDING'
const CHECK_FOR_UPDATE_SUCCESS = 'CHECK_FOR_UPDATE_SUCCESS'
const CHECK_FOR_UPDATE_FAILURE = 'CHECK_FOR_UPDATE_FAILURE'

const DOWNLOAD_UPDATE_PENDING = 'DOWNLOAD_UPDATE_PENDING'
const DOWNLOAD_UPDATE_SUCCESS = 'DOWNLOAD_UPDATE_SUCCESS'
const DOWNLOAD_UPDATE_FAILURE = 'DOWNLOAD_UPDATE_FAILURE'
//
const QUIT_AND_INSTALL_UPDATE = 'QUIT_AND_INSTALL_UPDATE'
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
    },
    async shutdownAndInstall () {
      ipcRenderer.send(QUIT_AND_INSTALL_UPDATE)
    }
  },
  computed: {
  },
  data: () => ({
    updateAvailable: false,
    readyToShutdown: false
    //
  }),
  async mounted () {
    if (process.env.NODE_ENV === 'development') {
    } else {
      ipcRenderer.send(CHECK_FOR_UPDATE_PENDING)
      ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event, updateInfo) => {
        const version = updateInfo.version
        if (version && version !== appVersion) {
          ipcRenderer.send(DOWNLOAD_UPDATE_PENDING)
          this.updateAvailable = true
        }
      })
      ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, () => {
        console.log('failed update')
      })
      ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, () => {
        this.readyToShutdown = true
      })
      ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, () => {
        console.log('download failed')
      })
    }
    this.start()
  }
}
</script>
  <style lang="sass">
    @import '../node_modules/typeface-roboto/index.css'
  </style>
