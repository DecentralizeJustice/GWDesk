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
            </div>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  unpackMainBinary, unpackPhotos, changeName, changePhoto
} from '@/assets/util/trezorCli/general.js'
export default {
  components: {
  },
  data: () => ({
    walletName: 'Turing',
    photoName: 'turing',
    channel: {}
  }),
  methods: {
    unpack: async function () {
      const test = await unpackMainBinary()
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
