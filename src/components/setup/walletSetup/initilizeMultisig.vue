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
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$emit('next', 2)
    },
    async download () {
      let textContents = ''
      const lines = [
        '# Coldcard Multisig setup file (exported from 4369050F)',
        '#',
        'Name: MeMyself',
        'Policy: 2 of 4',
        "Derivation: m/45'",
        'Format: P2WSH'
      ]
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
