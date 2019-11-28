export const userConstants = {
  // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' instead of mounting getters, mutations, and actions to the root namespace.
  namespaced: true,
  state: {
    payDate: 0, // epoch,
    amount: 0, // btc,
    membershipId: '12', // unique string
    time: 32 // epoch time
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
