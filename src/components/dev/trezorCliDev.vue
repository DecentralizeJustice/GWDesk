<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
            <v-divider class='mb-5'/>
            <div class="text-center">
            <v-btn
              color="orange"
              v-on:click="unpack()"
              class="mx-2 my-2"
            >
              Unpack Main Binary
            </v-btn>
            <v-btn
              color="red"
              v-on:click="unpackPhotos()"
              class="mx-2 my-2"
            >
              Unpack Photos
            </v-btn>
            <v-btn
              color="purple darken-4"
              class="mx-2 my-2"
              v-on:click="changeName()"
            >
              Change Name
            </v-btn>
            <v-btn
              color="blue darken-4"
              class="mx-2 my-2"
              v-on:click="changePhoto()"
            >
              Change Photo
            </v-btn>
            <v-btn
              color="pink darken-4"
              class="mx-2 my-2"
              v-on:click="getInfo()"
            >
              Get Info
            </v-btn>
            <v-btn
              color="green darken-4"
              class="mx-2 my-2"
              v-on:click="getNode()"
            >
              Get Node
            </v-btn>
            <v-btn
              color="orange darken-4"
              class="mx-2 my-2"
              v-on:click="updateFirmware()"
            >
              Update
            </v-btn>
            <v-btn
              color="pink darken-4"
              class="mx-2 my-2"
              v-on:click="getVersion()"
            >
              Get Version
            </v-btn>
            <v-btn
              color="teal"
              class="mx-2 my-2"
              v-on:click="getStatus()"
            >
              Get Status
            </v-btn>
            </div>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  unpackMainBinary, unpackPhotos, changeName, changePhoto,
  getInfo, getNode, updateFirmware, getVersionNumber, getStatus
} from '@/assets/util/trezorCli/general.js'
export default {
  components: {
  },
  data: () => ({
    node: "m/44'/0'/0'",
    walletName: 'Turing',
    photoName: 'turing',
    channel: {},
    version: '2.1.7'
  }),
  methods: {
    unpack: async function () {
      const test = await unpackMainBinary()
      console.log(test)
    },
    updateFirmware: async function () {
      this.channel = await updateFirmware(this.version)
      this.addListeners(this.channel)
    },
    getVersion: async function () {
      const test = await getVersionNumber()
      console.log(test)
    },
    getStatus: async function () {
      const test = await getStatus()
      console.log(test)
    },
    unpackPhotos: async function () {
      const result = await unpackPhotos()
      console.log(result)
    },
    changeName: async function () {
      this.channel = changeName(this.walletName)
      this.addListeners(this.channel)
    },
    changePhoto: async function () {
      this.channel = changePhoto(this.photoName)
      this.addListeners(this.channel)
    },
    getInfo: async function () {
      const info = await getInfo()
      console.log(info)
    },
    getNode: async function () {
      this.channel = getNode(this.node)
      this.addListeners(this.channel)
    },
    addListeners: function (stream) {
      stream.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
      stream.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })
      stream.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
