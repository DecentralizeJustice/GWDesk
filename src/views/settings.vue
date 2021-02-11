<template>
  <v-row no-gutters align-content='center' justify='center'>
    <v-col
      cols="10"
      v-if='disclaimerRead'
    >
    <v-card :key='keyInfo' class="grey darken-3" >
      <v-card-title class="headline justify-center">
        Settings
      </v-card-title>
      <v-divider></v-divider>
      <v-tabs>
        <v-tab>
          Hardware Wallet
        </v-tab>
        <v-tab-item>
          <hardwareWallet/>
        </v-tab-item>
      </v-tabs>
      <v-divider/>
      <v-card-actions>
      <!-- <v-btn
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn> -->
      <v-btn
        color="primary"
        text
        @click='refresh()'
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
    <v-col
      cols="10"
      v-if='!disclaimerRead && !loading'
    >
    <v-card class="grey darken-3" >
      <v-card-title class="display-2 justify-center">
        Terms and Conditions
      </v-card-title>
      <v-divider/>
      <v-card-text class="ma-4">
      <v-row
        align="center"
      >
        <div class="white--text title font-weight-regular">
          1. This Testnet Wallet is realsed under the MIT License and by using it you
          agree to that license which can be found here: https://opensource.org/licenses/MIT
        </div>
        <div class="white--text display-1 mt-2">
          By clicking continue you understand and agree to the previous point.
        </div>
      </v-row>
      <v-row
          align="center"
          justify="space-around"
          class="mt-3"
        >
          <!-- <v-btn color='green' @click='takeLesson'>
            Take Lesson
          </v-btn> -->
          <v-btn
            depressed
            color="primary"
            @click='readDiscaimer'
          >
            I agree & Continue
          </v-btn>
        </v-row>
      </v-card-text>
      <v-divider/>
    </v-card>
    </v-col>
    <v-col v-if='!disclaimerRead && loading'>Loading</v-col>
  </v-row>
</template>

<script>
import hardwareWallet from '@/components/settings/main.vue'
import { mapGetters } from 'vuex'
import {
  hardStopDeamon, permissionElectrum, unpackElectrum
} from '@/assets/util/btc/electrum/general.js'
import {
  unpackBinary
} from '@/assets/util/hwi/general.js'
import {
  unpackMainBinary
} from '@/assets/util/trezorCli/general.js'
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  components: {
    hardwareWallet
  },
  data: () => ({
    alreadyCopied: false,
    loading: false,
    keyInfo: 1,
    disclaimerRead: false,
    lessonInfo: { name: 'lessons', params: { lessonCategory: 'Wallet', lesson: 0 } }
  }),
  computed: {
    ...mapGetters('hardwareInfo', [
      'singleSigHardwareWalletInfo'
    ])
  },
  methods: {
    takeLesson: function () {
      this.$router.push(this.lessonInfo)
    },
    readDiscaimer: async function () {
      this.loading = true
      await this.copyBinary()
      this.loading = false
      this.disclaimerRead = true
    },
    refresh: function () {
      this.keyInfo = this.keyInfo * -1
    },
    copyBinary: async function () {
      if (this.singleSigHardwareWalletInfo.vpub !== '') {
        await unpackElectrum()
        await timeout(1000)
        await unpackBinary()
        await timeout(1000)
        await unpackMainBinary()
        await permissionElectrum()
        await hardStopDeamon()
      }
    }
  },
  async mounted () {
    if (this.singleSigHardwareWalletInfo.vpub !== '') {
      this.disclaimerRead = true
    }
  }
}
</script>
