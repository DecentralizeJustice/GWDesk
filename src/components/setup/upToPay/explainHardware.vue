<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Needed Computing Hardware
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
      <hardwareWallets/>
      </v-col>
      <v-col
        cols='6'
      >
      <computers/>
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
import hardwareWallets from '@/components/setup/upToPay/components/hardwareWallets.vue'
import computers from '@/components/setup/upToPay/components/computers.vue'
import videoPlayer from '@/components/video.vue'
export default {
  components: {
    hardwareWallets,
    computers,
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
      this.$emit('next', 2)
    },
    back () {
      this.$emit('next', 0)
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
