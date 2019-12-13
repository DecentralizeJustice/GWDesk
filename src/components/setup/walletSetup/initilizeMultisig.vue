<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Initialize Multisig
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="">
    <v-row justify='center'
    >
      <v-col
        cols='9'
      >
      <v-card-text>
        <videoPlayer
        v-bind:url="url"
        />
      </v-card-text>
      </v-col>
      </v-row>
      <v-row
      >
      <v-col
        cols='6'
      >
      <div class="">
        <v-btn x-large color="success" dark @click='download()'>
          Download Multisig Text File
        </v-btn>
      </div>
      </v-col>
      <v-col
        cols='6'
      >
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
        @click='setupWallet()'
      >
        Next Step
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import videoPlayer from '@/components/video.vue'
import { createNamespacedHelpers } from 'vuex'
import { downloadTXT } from '@/assets/util/electronUtil.js'
const { mapActions } = createNamespacedHelpers('stageInfo')
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
    back () {
      this.$emit('next', 2)
    },
    async download () {
      const devpath = 'Derivation: ' + this.xpubInfo[0].p2wsh_deriv
      const lines = [
        '# Coldcard Multisig setup file',
        '# (exported from decen desktop app)',
        'Name: Main Wallet',
        'Policy: 2 of 3',
        devpath,
        'Format: P2WSH',
        ''
      ]
      for (const element of this.xpubInfo) {
        const string = element.xfp + ': ' + element.p2wsh
        lines.push(string)
      }
      let textContents = ''
      for (var line in lines) {
        textContents = textContents.concat(lines[line])
        textContents = textContents.concat('\n')
      }
      await downloadTXT(textContents)
    },
    ...mapActions([
      'setupWallet'
    ])
  },
  computed: {
    url: function () {
      return 'http://34.102.232.129/echo-hereweare.mp4'
    }
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
