<template>
  <v-card class="flat" color='grey darken-3'>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-img
            :src="walletPhoto"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
          class="text-center"
        >
          <v-row
            class=""
            justify="center"
          >
            <v-col class="">
              <v-btn
                color="orange"
                text
                v-on:click="promptPin()"
              >
                Unlock
              </v-btn>
              <v-btn
                color="red"
                text
                v-on:click="wipe()"
              >
                Wipe
              </v-btn>
              <v-btn
                color="blue"
                text
                v-on:click="enterPin()"
              >
                Enter Pin
              </v-btn>
              <v-btn
                color="blue"
                text
                v-on:click="setup()"
              >
                Setup
              </v-btn>
              <textarea v-model="pin" placeholder="Enter Pin"></textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import image1 from '@/assets/photos/trezor.jpeg'
import image2 from '@/assets/photos/trezormodelt.jpeg'
export default {
  props: ['walletInfo'],
  data: () => ({
    dialog: false,
    pin: ''
  }),
  methods: {
    promptPin: function () {
      this.$emit('promptPin', this.model, this.path)
    },
    enterPin: function () {
      this.$emit('enterPin', this.model, this.path, this.pin)
    },
    wipe: function () {
      this.$emit('wipe', this.model, this.path)
    },
    setup: function () {
      this.$emit('setup', this.model, this.path)
    }
  },
  computed: {
    walletPhoto: function () {
      switch (this.model) {
        case 'trezor_1':
          return image1
        case 'trezor_t':
          return image2
        default:
          return ''
      }
    },
    model: function () {
      return this.walletInfo.model
    },
    path: function () {
      return this.walletInfo.path
    }
  },
  mounted () {
    // console.log(this.walletInfo)
  }
}
</script>
