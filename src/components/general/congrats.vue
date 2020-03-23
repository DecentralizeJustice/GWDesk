<template>
  <v-row align="center" justify='center'>
    <v-col cols='12' class="text-center">
      <v-alert type="success" style="margin:auto;width:50%;">
        Congratulations !!!
      </v-alert>
    </v-col>
   <v-col cols='4'>
     <videoPlayer
      v-bind:vidUrl="vidUrl"
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
import videoPlayer from '@/components/general/localVideo.vue'
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
  },
  async mounted () {
  }
}
</script>
