const crypto = require('crypto')
export const hardwareInfo = {
  namespaced: true,
  state: {
    wallets: [
      // singlesig Info [0]
      {
        fingerprint: '',
        firmwareVersion: '',
        model: '',
        vpub: '',
        vpubPath: 'm/84h/1h/0h'
      }
    ]
  },
  mutations: {
    updatefirmwareVersion (state, firmwareVersion) {
      state.wallets[0].firmwareVersion = firmwareVersion
    },
    updateHardwareWalletInfo (state, payload) {
      state.wallets[0].vpub = payload.vpub
      state.wallets[0].fingerprint = payload.fingerprint
      state.wallets[0].model = payload.model
      state.wallets[0].firmwareVersion = payload.firmwareVersion
    }
  },
  actions: {
    updatefirmwareVersion (context, firmwareVersion) {
      context.commit('updatevpub', firmwareVersion)
    },
    updateHardwareWalletInfo (context, payload) {
      context.commit('updateHardwareWalletInfo', payload)
    }
  },
  getters: {
    singleSigHardwareWalletInfo: state => {
      return state.wallets[0]
    },
    singleSigElectrumName: state => {
      const info = state.wallets[0].vpub
      const hash = crypto.createHash('sha1').update(info).digest('hex')
      return hash
    }
  }
}
