<template>
  <div>
      <video style="width:100%;height:auto;"
        :src="processedUrl"
        controls type="video/mp4">
      </video>
  </div>
</template>

<script>
const fs = require('fs-extra')
const path = require('path')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['vidUrl'],
  data () {
    return {
      processedUrl: ''
    }
  },
  methods: {
  },
  computed: {
  },
  async mounted () {
    // console.log(this.vidUrl)
    const url = 'videos/' + this.vidUrl
    // eslint-disable-next-line
    const fileLocation = path.join(__static, url)
    const fileContents = fs.readFileSync(fileLocation)
    const blob = new window.Blob([fileContents], { type: 'video/mp4' })
    const urlb = URL.createObjectURL(blob)
    this.processedUrl = urlb
  }
}
</script>
