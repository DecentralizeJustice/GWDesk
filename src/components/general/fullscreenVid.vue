<template>
  <v-card style='overflow-x: hidden;'>
    <v-container fluid style='height:100vh;'>
        <v-row
          no-gutters
          justify='center'
        >
          <v-col lg='11' md='9' sm='9' xl='12'>
           <videoPlayer
           v-bind:courseInfo="courseInfo"
           @paused="vidPaused"
           v-bind:time='time'
           />
           </v-col>
        </v-row>
        <v-row
          no-gutters
          justify='center'
        >
        <v-col cols='12' class="text-center">
          <v-btn color='red' @click="toggle" class="mt-3">
            Exit
          </v-btn>
        </v-col>
        </v-row>
      </v-container>
  </v-card>
</template>

<script>
import videoPlayer from '@/components/general/localAudio.vue'
export default {
  components: {
    videoPlayer
  },
  props: {
    courseInfo: {},
    time: {}

  },
  data () {
    return {
    }
  },
  methods: {
    vidPaused (info) {
      this.$emit('paused', info)
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  watch: {
  },
  computed: {
  },
  async mounted () {
  },
  async beforeDestroy () {
  }
}
</script>
