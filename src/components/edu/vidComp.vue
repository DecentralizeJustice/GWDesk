<template>
  <v-row align="center" justify='center'>
   <v-col cols='8'>
     <audioPlayer
     v-bind:vidUrl="vidUrl"
     v-bind:desiredHash="vidHash"
     />
   </v-col>
  </v-row>
</template>

<script>
import audioPlayer from '@/components/general/localAudio.vue'
export default {
  name: 'vidComp',
  components: {
    audioPlayer
  },
  props: ['vidUrl', 'vidHash'],
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
}
</script>
<style >
</style>
