<template>

      <video style="width:100%;height:auto;" controls v-if='!bloburl=="" && hashPassed'
      preload="auto">
          <source :src='bloburl' type="video/mp4">
      </video>
</template>

<script>
const axios = require('axios')
const crypto = require('crypto')
// const toStream = require('blob-to-stream')
const toBuffer = require('blob-to-buffer')
export default {
  name: 'videoPlayer',
  components: {
  },
  props: ['url'],
  data () {
    return {
      hashPassed: false,
      bloburl: '',
      vidHash: '',
      desiredHash: '2fd4d02c1247d10f22d8678f427d9ee787ce6093f4258d2eb4da8146980c6514c094338f001576ace76dc33c12623cb5afc3322e639757a1178973a2b5eb749e'
    }
  },
  methods: {
  },
  computed: {
    // a computed getter
    // hashOk: function () {
    //   const passed = (this.desiredHash === this.vidHash)
    //   console.log(this.vidHash)
    //   return passed
    // }
  },
  async beforeMount () {
    const url = this.url
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
    hash.setEncoding('hex')
    toBuffer(blob, async function (err, buffer) {
      if (err) throw err
      hash.update(buffer)
      const yes = await hash.digest('hex')
      if (this.desiredHash === yes) {
        this.hashPassed = true
        console.log('right hash')
      } else {
        console.log('wrong hash')
      }
    }.bind(this))

    // hash.on('finish', function () {
    //   const hashInfo = hash.read()
    //   this.vidHash = hashInfo
    //   this.hashPassed = true
    //   console.log(this.desiredHash)
    //   console.log(this.desiredHash === hashInfo)
    //   this.test()
    // })
    // toStream(blob).pipe(hash)
  }
}
</script>
