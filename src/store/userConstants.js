export const userConstants = {
  // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' instead of mounting getters, mutations, and actions to the root namespace.
  namespaced: true,
  state: {
    walletObjects: [],
    token: '85ca804272de4e87fe6a9357260bc1b1b4eb5b7ffcba167eca17d60bc04e8e43',
    apiKey: 'hunter2',
    m: 2
  },
  mutations: {
    updateWalletObject (state, walletObject) {
      state.walletObjects = walletObject
    }
  },
  actions: {
    updateWalletObject (context, walletObject) {
      console.log(walletObject)
      console.log('ran')
      context.commit('updateWalletObject', walletObject)
    }
  }
}
