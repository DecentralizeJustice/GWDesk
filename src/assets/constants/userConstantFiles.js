import store from '../../store/index.js'

const vpubObject = store.getters['userConstants/walletIdandVpubs']
const xfp = store.getters['userConstants/xfp']
const token = store.state.userConstants.token
const apiKey = 'hunter2'

export { vpubObject, token, apiKey, xfp }
