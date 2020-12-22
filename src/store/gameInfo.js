export const gameInfo = {
  namespaced: true,
  state: {
    gameInfo: '',
    privateId: ''
  },
  mutations: {
    updateInfo (state, info) {
      if (info.adjective) {
        state.gameInfo.adjective = info.adjective
      }
      if (info.emoji) {
        state.gameInfo.emoji = info.emoji
      }
      if (info.address) {
        state.gameInfo.address = info.address
      }
    },
    updatePrivateId (state, privateId) {
      state.privateId = privateId
    }
  },
  actions: {
    updateInfo (context, payload) {
      context.commit('updateInfo', payload)
    },
    updatePrivateId (context, payload) {
      context.commit('updatePrivateId', payload)
    }
  }
}
