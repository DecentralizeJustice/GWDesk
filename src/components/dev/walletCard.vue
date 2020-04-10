<template>
  <v-card class="text-center flat">
    <v-container  style="background-color: grey;" >

      <pingrid v-if='pingridUse'
        v-on:exit="pingridUse = false"
        v-on:enter="enter"
        v-on:enterPin="enterPin"
        />

      <v-row justify="center" v-if='!pingridUse'>
        <v-col cols="12">
          <v-img
            :src="walletPhoto"
          ></v-img>
        </v-col>
        <v-col
          cols="4"
        >
          <v-btn
            color="orange"
            v-on:click="promptPin()"
          >
            Unlock
          </v-btn>
        </v-col>
        <v-col
          cols="3"
        >
          <v-btn
            color="red"
            v-on:click="wipe()"
          >
            Wipe
          </v-btn>
        </v-col>
        <v-col
          cols="4"
        >
              <v-btn
                color="blue"
                v-on:click="setup()"
              >
                Setup
              </v-btn>
            </v-col>
            <v-col
              cols="4"
            >
              <v-btn
                color="orange"
                v-on:click="pingridUse = true"
              >
                Grid
              </v-btn>
              <!-- <v-text-field v-model="pin" placeholder="Enter Pin" background-color='black'/> -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import image1 from '@/assets/photos/trezor.jpeg'
import image2 from '@/assets/photos/trezormodelt.jpeg'
import pingrid from '@/components/dev/pingrid.vue'
export default {
  props: ['walletInfo'],
  components: {
    pingrid
  },
  data: () => ({
    dialog: false,
    pingridUse: false
  }),
  methods: {
    promptPin: function () {
      this.$emit('promptPin', this.model, this.path)
    },
    enterPin: function (pin) {
      this.$emit('enterPin', this.model, this.path, pin)
    },
    wipe: function () {
      this.$emit('wipe', this.model, this.path)
    },
    setup: function () {
      this.$emit('setup', this.model, this.path)
    },
    enter: function (pin) {
      this.$emit('enter', pin)
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
    // console.log(this.pingridUse)
  }
}
</script>
