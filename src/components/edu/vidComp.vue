<template>
  <v-row align="center" justify='center'>
   <v-col cols='8'>
     <videoPlayer
     v-bind:vidUrl="vidUrl"
     v-bind:desiredHash="vidHash"
     />
   </v-col>
  </v-row>
</template>

<script>
import videoPlayer from '@/components/general/hashCheckVid.vue'
export default {
  name: 'vidComp',
  components: {
    videoPlayer
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
