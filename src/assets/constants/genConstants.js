// https://www.reddit.com/r/TREZOR/comments/4gakr6/where_is_bip48_documented/
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// coldcard export xpub selects this path
// should be    "m/48'/1'/0'/2'/0'"
const divPath = "m/48'/1'/0'/2'"
const changeDiv = "m/48'/1'/0'/2'/1"
const recDiv = "m/48'/1'/0'/2'/0"
export {
  divPath, recDiv, changeDiv
}
