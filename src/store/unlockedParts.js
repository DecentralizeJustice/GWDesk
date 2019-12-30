const R = require('ramda')
export const unlockedLessons = {
  namespaced: true,
  state: {
    walletSecurity: {
      introSecurityModel: false,
      HardwareWallletSecurityintro: false,
      updateHardwareWallet: false,
      hardwareWalletHardwareSecurity: false
    },
    walletOperations: {
      supportingAccounts: false,
      multipleReceiveAdresses: false,
      transFees: false,
      introSendMoney: false,
      introReceiveMoney: false,
      introTransactions: false,
      introSupport: false
    },
    btcBlockChainMechanics: {
      pendingAndConfirmingTransactions: false,
      rbf: false,
      cpfp: false,
      nodeIntro: false,
      fullVsSPVnode: false,
      privacy: false
    },
    generalInformation: {
      pyramidSchemes: false,
      exchangeSafety: false,
      chainSpecialty: false,
      exchangeIntro: false,
      lightningNetworkOverview: false,
      whyCryptocurrencyintro: false,
      whyBitcoin: false,
      whyLightning: false,
      whyMonero: false,
      bitcoinBubbles: false
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    introDone: state => {
      const introStates = [
        state.walletSecurity.introSecurityModel,
        state.walletOperations.introSendMoney,
        state.walletOperations.introReceiveMoney,
        state.walletOperations.introTransactions,
        state.walletOperations.introSupport
      ]
      const equalsTrue = R.equals(true)
      const allDone = R.all(equalsTrue)(introStates)
      return allDone
    }
  }
}
