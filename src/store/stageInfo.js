export const stageInfo = {
  // This makes your getters, mutations, and actions accessed by, eg: 'myModule/myModularizedNumber' instead of mounting getters, mutations, and actions to the root namespace.
  namespaced: true,
  state: {
    paid: false,
    hardwareSetupDone: false,
    main: false,
    walletTour: false
  },
  mutations: {
    paid (state) {
      state.paid = true
    },
    setupWallet (state) {
      state.hardwareSetupDone = true
    },
    doneWalletTour (state) {
      state.walletTour = true
    },
    mainReady (state) {
      state.main = true
    }
  },
  actions: {
    paid (context) {
      context.commit('paid')
    },
    setupWallet (context) {
      context.commit('setupWallet')
    },
    completeWalletTour (context) {
      context.commit('doneWalletTour')
      context.commit('mainReady')
    }
  },
  getters: {
    currentStage: state => {
      if (!state.paid) {
        return 'pay'
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
