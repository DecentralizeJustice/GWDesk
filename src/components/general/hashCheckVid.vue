<template>

      <video style="width:100%;height:auto;" controls v-if='!bloburl=="" && hashPassed'
      preload="auto">
          <source :src='bloburl' type="video/mp4">
      </video>
</template>

<script>
const axios = require('axios')
const crypto = require('crypto')
const toBuffer = require('blob-to-buffer')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['vidUrl', 'desiredHash'],
  data () {
    return {
      hashPassed: false,
      bloburl: '',
      vidHash: ''
    }
  },
  methods: {
  },
  computed: {
  },
  async beforeMount () {
    const url = this.vidUrl
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'blob'
    })
    const data = await response.data
    const blob = new window.Blob([data], { type: 'video/mp4' })
    const urlb = await URL.createObjectURL(blob)
    this.bloburl = urlb
    var hash = crypto.createHash('sha512')
    toBuffer(blob, async function (err, buffer) {
      if (err) throw err
      hash.update(buffer)
      const testingHash = await hash.digest('base64')
      if (this.desiredHash === testingHash) {
        this.hashPassed = true
        // console.log('right hash')
      } else {
        console.log(testingHash)
        console.log('wrong hash')
      }
    }.bind(this))
  }
}
</script>
