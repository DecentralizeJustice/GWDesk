// https://www.reddit.com/r/TREZOR/comments/4gakr6/where_is_bip48_documented/
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// coldcard export xpub selects this path
// should be    "m/48'/1'/0'/2'/0'"
const divPath = "m/48'/1'/0'/2'"
const changeDiv = "m/48'/1'/0'/2'/1"
const recDiv = "m/48'/1'/0'/2'/0"
const gapLimit = 2
const walletName = 'musig'
const oldestBlock = 1583007
const oldestBlockHash = '202726e81f98a178d4f8023ab336a4587f14b07ada4428b4f60ccad0a2d37dc7'
const changeAccount = 'defaultChange'
const receiveAccount = 'defaultReceive'
const minConfirmations = 3 // same as coinbase exchange
const m = 2
const n = 3
export {
  divPath, gapLimit, walletName, oldestBlock, oldestBlockHash,
  minConfirmations, m, changeDiv, recDiv, n, changeAccount, receiveAccount
}
