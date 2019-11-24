<template>
<v-container class="grey" style="height:100vh;width:100vw;" fluid>
    <v-row
    justify="center"
    >
      <v-col
      cols='10'
      style="margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);"
      >
      <video style="width:100%;height:auto;" controls>
          <source :src='getvid()' type="video/mp4">
      </video>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import path from 'path'
export default {
  components: {
    // videoPlayer
  },
  data () {
    return {
    }
  },
  methods: {
    getvid: function () {
      return path.join(process.env.BASE_URL, 'videos/sample.mp4')
    }
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
