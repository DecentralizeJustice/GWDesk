
const R = require('ramda')
export const userConstants = {
  namespaced: true,
  state: {
    walletObjects: [],
    token: '',
    apiKey: 'hunter2',
    m: 2
  },
  mutations: {
    updateWalletObject (state, walletObject) {
      state.walletObjects = walletObject
    },
    updateWalletToken (state, walletToken) {
      state.token = walletToken
    }
  },
  actions: {
    updateWalletObject (context, walletObject) {
      context.commit('updateWalletObject', walletObject)
    },
    updateWalletToken (context, walletToken) {
      context.commit('updateWalletToken', walletToken)
    }

  },
  getters: {
    walletVpubs: (state, getters) => {
      const getWalletObject = walletObject => walletObject.p2wsh
      const vpubArray = R.map(getWalletObject, state.walletObjects)
      return vpubArray
    },
    walletIdandVpubs: (state, getters) => {
      const getWalletObject = walletObject => walletObject.p2wsh
      const vpubArray = R.map(getWalletObject, state.walletObjects)
      const walletObject = {}
      for (var i = 0; i < vpubArray.length; i++) {
        walletObject[i] = vpubArray[i]
      }
      return walletObject
    }
  }
}
