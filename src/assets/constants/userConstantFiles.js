import store from '../../store/index.js'

const vpubObject = store.getters['userConstants/walletIdandVpubs']
const xfp = { coldcard: '6C6816CE', web: 'DFFED015' }
const token = store.state.userConstants.token
const apiKey = 'hunter2'
const m = store.state.userConstants.m
const neededConfirmedConfirmations = { 2: '1,000usd' }

export { vpubObject, token, apiKey, m, xfp, neededConfirmedConfirmations }
