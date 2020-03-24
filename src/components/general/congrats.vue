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
     class="mr-3"
       color="primary darken-2"
       @click="done()"
     >
       Done
     </v-btn>
     <v-btn
      v-if='nextLessonavAilable'
      color="primary darken"
      @click="nextLesson()"
     >
       Next Lesson
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
  props: ['vidUrl', 'nextLessonavAilable'],
  data () {
    return {
    }
  },
  methods: {
    done () {
      this.$emit('quizDone')
    },
    nextLesson () {
      this.$emit('nextLesson')
    }
  },
  computed: {
  },
  async mounted () {
  }
}
</script>
