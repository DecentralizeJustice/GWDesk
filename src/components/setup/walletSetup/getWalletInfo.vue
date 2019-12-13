<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Get Wallets Info
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="">
    <v-row justify='center'
    >
      <v-col
        cols='12'
      >
      <v-card-text>
        <videoPlayer
        v-bind:url="url"
        />
      </v-card-text>
      </v-col>
      </v-row>
      <v-row justify='center' align-conten='center'
      >
      <v-col
        cols='3'
        justify='center' align-conten='center'
        v-for="n in 3"
      :key="n"
      >
      <div class="text-xs-center">
        <v-btn x-large :color="uploaded(n)" dark @click='upload(n)'>
          {{getCordinal(n)}} Card <br>
          <v-icon>mdi-file-upload</v-icon>
        </v-btn>

      </div>
      </v-col>
    </v-row>
  </v-container>

    <v-divider></v-divider>
    <v-card-actions>

      <v-btn
        color="indigo lighten-1"
        @click='back()'
      >
        Back
      </v-btn>
      <v-spacer/>
      <v-btn
        color="green"
        @click='nextOrder()'
        v-if='allUploaded'
      >
        Next Step
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { uploadJSON } from '@/assets/util/electronUtil.js'
import videoPlayer from '@/components/video.vue'
const R = require('ramda')
export default {
  components: {
    videoPlayer
  },
  props: ['xpubInfo'],
  data () {
    return {
    }
  },
  methods: {
    getCordinal: function (number) {
      if (number === 1) {
        return '1st'
      }
      if (number === 2) {
        return '2nd'
      }
      if (number === 3) {
        return '3rd'
      }
    },
    nextOrder () {
      this.$emit('next', 3)
    },
    back () {
      this.$emit('next', 1)
    },
    updateWalletInfo (index, object) {
      this.$emit('updateXpubInfo', index, object)
    },
    async upload (wallet) {
      const index = wallet - 1
      try {
        const file = await uploadJSON()
        const walletObject = {
          xfp: file.xfp, p2wsh: file.p2wsh, p2wsh_deriv: file.p2wsh_deriv
        }
        this.updateWalletInfo(index, walletObject)
      } catch (error) {
        console.log('Nothing Chosen')
      }
    },
    uploaded (number) {
      const info = this.xpubInfo
      if (info[number - 1] === '') {
        return 'blue'
      }
      return 'green'
    }
  },
  computed: {
    url: function () {
      return 'http://34.102.232.129/echo-hereweare.mp4'
    },
    allUploaded: function () {
      const info = this.xpubInfo
      const isEmpty = R.equals('')
      const anyEmpty = R.any(isEmpty)(info)
      return !anyEmpty
    }
  },
  async created () {
  }
}
</script>
