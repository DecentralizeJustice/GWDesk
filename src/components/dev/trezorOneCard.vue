<template>
  <v-card class="text-center flat" style="background-color: grey;">
    <pingrid v-if='pingridUse'
      v-on:exit="pingridUse = false"
      v-on:enter="enter"
      v-on:enterPin="enterPin"
      />
    <v-container v-show='!pingridUse && !textUse'>
      <v-row justify="center">
        <v-col cols="12">
          <!-- <v-img
            :src="walletPhoto"
          ></v-img> -->
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
            color="pink"
            v-on:click="restore()"
          >
            Restore
          </v-btn>
        </v-col>
        <v-col
          cols="4"
        >
          <v-btn
            color="purple"
            v-on:click="pingridUse = true"
          >
            Grid
          </v-btn>
        </v-col>
        <v-col
          cols="4"
        >
          <v-btn
            color="teal"
            v-on:click="textUse = true"
          >
            Text
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
      </v-row>
    </v-container>
    <v-row v-if='textUse'>
      <v-col cols="8" offset='2'>
        <v-text-field v-model="text" placeholder="Enter Text" background-color='black'/>
      </v-col>
      <v-col
        cols="4"
      >
        <v-btn
          color="green"
          v-on:click="enter(text)"
        >
          Enter
        </v-btn>
      </v-col>
      <v-col
        cols="4"
      >
        <v-btn
          color="blue"
          v-on:click="textUse = false"
        >
          Done
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import pingrid from '@/components/dev/pingrid.vue'
export default {
  props: ['walletInfo'],
  components: {
    pingrid
  },
  data: () => ({
    dialog: false,
    pingridUse: false,
    text: '',
    textUse: false
  }),
  methods: {
    displayAddress: function () {
      this.$emit('displayAddress', this.model, this.path)
    },
    promptPin: function () {
      this.$emit('promptPin', this.model, this.path)
    },
    enterPin: function (pin) {
      this.$emit('enterPin', this.model, this.path, pin)
    },
    getxpub: function () {
      this.$emit('getxpub', this.model, this.path)
    },
    wipe: function () {
      this.$emit('wipe', this.model, this.path)
    },
    setup: function () {
      this.$emit('setup', this.model, this.path)
    },
    enter: function (pin) {
      this.text = ''
      this.$emit('enter', pin)
    },
    restore: function () {
      this.$emit('restore', this.model, this.path)
    }
  },
  computed: {
    walletPhoto: function () {
      return ''
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
