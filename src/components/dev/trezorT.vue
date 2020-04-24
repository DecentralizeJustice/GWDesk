<template>
  <v-card class="text-center flat" style="background-color: grey;">
    <pingrid v-if='pingridUse'
      v-on:exit="pingridUse = false"
      v-on:enter="enter"
      v-on:enterPin="enterPin"
      />
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-img
            :src="walletPhoto"
          ></v-img>
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
            color="lime darken-4"
            v-on:click="getxpub"
          >
            Xpub
          </v-btn>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn
            color="brown"
            v-on:click="displayAddress"
          >
            Display Address
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
            color="pink"
            v-on:click="restore()"
          >
            Restore
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import image1 from '@/assets/photos/trezormodelt.jpeg'
export default {
  props: ['walletInfo'],
  components: {
  },
  data: () => ({
    dialog: false,
    pingridUse: false
  }),
  methods: {
    wipe: function () {
      this.$emit('wipe', this.model, this.path)
    },
    setup: function () {
      this.$emit('setup', this.model, this.path)
    },
    getxpub: function () {
      this.$emit('getxpub', this.model, this.path)
    },
    displayAddress: function () {
      this.$emit('displayAddress', this.model, this.path)
    },
    restore: function () {
      this.$emit('restore', this.model, this.path)
    }
  },
  computed: {
    walletPhoto: function () {
      return image1
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
