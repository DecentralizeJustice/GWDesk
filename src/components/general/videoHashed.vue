<template>
      <video style="width:100%;height:auto;" controls v-if='true'
     :src="require('@/assets/videos/video.mp4')" type="video/mp4">
      </video>
      <!-- <img :src="require('@/assets/logo.png')"> -->
</template>

<script>
// const axios = require('axios')
// const crypto = require('crypto')
// const toBuffer = require('blob-to-buffer')
// const path = require('path')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['url'],
  data () {
    return {
      hashPassed: false,
      publicPath: process.env.BASE_URL,
      bloburl: '',
      vidHash: '',
      desiredHash: '+3ZDXg/BiFaFWw8XCFfpsuOX3XJF21yeRBUIQOXWkRQ3QWIvqZ/cJB8Z/cKbnAcrX4SurgmPrftKL/mVT4SA7A=='
    }
  },
  methods: {
  },
  computed: {
    // file: function () {
    //   const fileLocation = path.join(process.env.BASE_URL, 'icon.png')
    //   return fileLocation
    // }
  },
  async beforeMount () {
    // const url = this.url
    // const response = await axios({
    //   method: 'get',
    //   url: url,
    //   responseType: 'blob'
    // })
    // const data = await response.data
    // const blob = new window.Blob([data], { type: 'video/mp4' })
    // const urlb = await URL.createObjectURL(blob)
    // this.bloburl = urlb
    // var hash = crypto.createHash('sha512')
    // toBuffer(blob, async function (err, buffer) {
    //   if (err) throw err
    //   hash.update(buffer)
    //   const testingHash = await hash.digest('base64')
    //   // console.log(testingHash)
    //   if (this.desiredHash === testingHash) {
    //     this.hashPassed = true
    //     // console.log('right hash')
    //   } else {
    //     console.log(testingHash)
    //     console.log('wrong hash')
    //   }
    // }.bind(this))
  }
}
</script>
