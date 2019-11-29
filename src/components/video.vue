<template>

      <video style="width:100%;height:auto;" controls>
          <source :src='getvid()' type="video/mp4">
      </video>
</template>

<script>
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['url'],
  data () {
    return {
    }
  },
  methods: {
    getvid: function () {
      return this.url
    }
  }
}
</script>
