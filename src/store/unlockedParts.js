const R = require('ramda')
export const unlockedLessons = {
  namespaced: true,
  state: {
    walletSecurity: {
      multisigSecurityModel: false,
      HardwareWallletSecurityintro: false,
      updateHardwareWallet: false,
      hardwareWalletHardwareSecurity: false,
      introWalletTypes: false
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
      introWhyCryptocurrency: false,
      introWhyBitcoin: false,
      whyLightning: false,
      whyMonero: false,
      bitcoinBubbles: false,
      introToExchanges: false,
      introMembershipInfo: false
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    introDone: state => {
      const introStates = [
        state.generalInformation.introWhyCryptocurrency,
        state.generalInformation.introWhyBitcoin,
        state.walletSecurity.introWalletTypes,
        state.walletOperations.introSupport,
        state.generalInformation.introToExchanges,
        state.generalInformation.introMembershipInfo
      ]
      const equalsTrue = R.equals(true)
      const allDone = R.all(equalsTrue)(introStates)
      return allDone
    }
  }
}
