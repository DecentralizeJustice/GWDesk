
const bs58check = require('bs58check')

function pubToXpub (pub) {
  var data = bs58check.decode(pub)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from('043587cf', 'hex'), data])
  return bs58check.encode(data)
}
export { pubToXpub }
