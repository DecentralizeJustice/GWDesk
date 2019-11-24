export const userConstants = {
  // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' instead of mounting getters, mutations, and actions to the root namespace.
  namespaced: true,
  state: {
    neededConfirmedConfirmations: { 2: '1,000' }
  },
  mutations: {
    // increment (state) {
    //   // mutate state
    //   state.userGeneratedInfo += 1
    // }
  },
  actions: {

  }
}
