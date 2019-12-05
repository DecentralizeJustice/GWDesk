const axios = require('axios')
const crypto = require('crypto')
const toStream = require('blob-to-stream')
const MakeBlob = require('cross-blob')
async function run () {
  const response = await axios({
    method: 'get',
    url: 'https://res.cloudinary.com/dylevfpbl/video/upload/v1551060213/donelygunn/crowd.mp4',
    responseType: 'blob'
  })
  global.Blob = MakeBlob
  const data = await response.data
  const blob = new MakeBlob([data], { type: 'video/mp4' })
  var hash = crypto.createHash('sha512')
  hash.setEncoding('hex')
  hash.on('finish', function () {
    console.log(hash.read()) // the desired sha1sum
  })
  toStream(blob).pipe(hash)
}
run()
