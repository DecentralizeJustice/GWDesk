<template>
  <v-card class="text-center flat" style="background-color: grey;">
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
          <!-- <v-btn
            color="red"
            v-on:click="wipe()"
          >
            Update
          </v-btn> -->
        </v-col>
        <v-col
          cols="4"
        >
          <v-btn
            color="blue"
            v-on:click="setup()"
            v-if='abletoSetup'
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
            v-if='abletoSetup'
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
import {
  wipe
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'status'],
  components: {
  },
  data: () => ({
    dialog: false,
    pingridUse: false
  }),
  methods: {
    wipe: async function () {
      await wipe(this.model, this.path)
    },
    setup: function () {
      this.$emit('setup', this.model, this.path)
    },
    restore: function () {
      this.$emit('restore', this.model, this.path)
    }
  },
  computed: {
    abletoSetup: function () {
      if (this.status[0] === 0 || this.status[0] === 1) {
        return true
      } else {
        return false
      }
    },
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
