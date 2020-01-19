<template>
  <v-row align="center">
    <v-col cols='6' class="text-center" offset='3'>
      <v-alert type="success">
        Congratulations !!!
      </v-alert>
    </v-col>
   <v-col cols='8' offset='2'>
     <videoPlayer
     v-bind:url="url"
     />
   </v-col>
   <v-col class="text-center" cols="12">
     <v-btn
       color="primary darken-2"
       @click="done()"
     >
       Done
     </v-btn>
   </v-col>
  </v-row>
</template>

<script>
import videoPlayer from '@/components/general/videoHashed.vue'
export default {
  name: 'congrats',
  components: {
    videoPlayer
  },
  props: ['vidUrl'],
  data () {
    return {
    }
  },
  methods: {
    done () {
      this.$emit('quizDone')
    }
  },
  computed: {
    url: function () {
      const path = require('path')
      const fileLocation = path.join(process.env.BASE_URL, this.vidUrl)
      return fileLocation
    }
  }
}
</script>
