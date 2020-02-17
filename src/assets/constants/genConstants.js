// https://www.reddit.com/r/TREZOR/comments/4gakr6/where_is_bip48_documented/
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// coldcard export xpub selects this path
// should be    "m/48'/1'/0'/2'/0'"
const divPath = "m/48'/1'/0'/2'"
const gapLimit = 2
const walletName = 'musig'
const oldestBlock = 1583007
const oldestBlockHash = '202726e81f98a178d4f8023ab336a4587f14b07ada4428b4f60ccad0a2d37dc7'
const account = 'default'
const minConfirmations = 3 // same as coinbase
export {
  divPath, gapLimit, walletName, oldestBlock, account, oldestBlockHash,
  minConfirmations
}
