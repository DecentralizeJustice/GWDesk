<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Initialize Hardware Wallets
      </v-card-title>
      <v-divider></v-divider>
    <v-card-text>
      <videoPlayer
      v-bind:url="url"
      />
    </v-card-text>
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
        @click='next()'
      >
        Next Step
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
    back () {
      this.$emit('next', 0)
    },
    next () {
      this.$emit('next', 2)
    }
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
