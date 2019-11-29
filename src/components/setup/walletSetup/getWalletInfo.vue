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
        cols='3'
      >
      <div class="">
        <v-btn x-large color="success" dark @click='upload()'>
          Upload Card Info
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
        @click='nextOrder()'
      >
        Next Step
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import path from 'path'
import { uploadJSON } from '@/assets/util/electronUtil.js'
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
    getvid: function () {
      return path.join(process.env.BASE_URL, 'videos/sample.mp4')
    },
    nextOrder () {
      this.$emit('next', 3)
    },
    back () {
      this.$emit('next', 1)
    },
    async upload () {
      const file = await uploadJSON()
      console.log(file)
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
