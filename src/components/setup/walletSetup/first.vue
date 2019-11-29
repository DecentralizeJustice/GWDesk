<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Hardware Wallet Setup
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
        Next Step
      </v-btn>
    </v-card-actions>
  </v-card>
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
      this.$emit('next', 1)
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
