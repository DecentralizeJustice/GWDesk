export const stageInfo = {
  // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' instead of mounting getters, mutations, and actions to the root namespace.
  namespaced: true,
  state: {
    productInfo: false,
    hardwareSetupDone: false,
    main: false,
    walletTour: false
  },
  mutations: {
    // increment (state) {
    //   // mutate state
    //   state.userGeneratedInfo += 1
    // }
  },
  actions: {

  },
  getters: {
    currentStage: state => {
      if (!state.productInfo) {
        return 'productInfo'
      }
      if (!state.hardwareSetupDone) {
        return 'hardwareSetup'
      }
      if (!state.walletTour) {
        return 'walletTour'
      }
      return 'main'
    }
  }
}
