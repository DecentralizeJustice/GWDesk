<template>
  <v-container  fill-height text-xs-center fluid>
    <v-layout align-center justify-center row>
      <v-flex xs10 >
      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Wallet Tour
      </v-card-title>
      <v-divider></v-divider>
    <v-card-text>
      <videoPlayer
      v-bind:url="url"
      />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="green"
        @click='nextOrder()'
      >
        Explore Wallet
      </v-btn>
    </v-card-actions>
  </v-card>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
import path from 'path'
import videoPlayer from '@/components/video.vue'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
    }
  },
  methods: {
    nextOrder () {
      // this.$emit('next', 1)
    }
  },
  computed: {
    url: function () {
      return path.join(process.env.BASE_URL, 'videos/sample.mp4')
    }
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
