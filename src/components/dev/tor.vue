<template>
  <v-card class="text-center flat" style="">
    <v-container>
      <v-row justify="center">
        <v-col
          cols="6"
        >
          <v-btn
            color="red"
            v-on:click="dormantb()"
          >
            Check If Dormant
          </v-btn>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn
            color="green"
            v-on:click="circuitEstablishedb()"
          >
            Check If Circuit Ready
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { dormant, circuitEstablished } from '@/assets/util/tor.js'
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
export default {
  components: {
  },
  data: () => ({
  }),
  methods: {
    dormantb: function () {
      ipcRenderer.on('dormant', (event, message) => {
        console.log(message)
      })
      dormant()
    },
    circuitEstablishedb: function () {
      ipcRenderer.on('circuitEstablished', (event, message) => {
        console.log(message)
      })
      circuitEstablished()
    }
  },
  computed: {
  },
  mounted () {
    // console.log(this.pingridUse)
  }
}
</script>
