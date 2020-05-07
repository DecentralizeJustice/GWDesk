<template>
      <v-flex xs12>
        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline" >Enter The Last 4 Characters of Address:</h3>
          </div>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="addressGuess" v-on:input="checkGuess"
                label="Last 4 Characters"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <div v-show="addressReady">
          {{unusedAddress}}
        </div>
        <v-btn
          color="orange"
          v-on:click="showAddress()"
        >
          Show Address Again
        </v-btn>
        <v-btn
          color="blue"
          v-on:click="copyToClipboard()"
          v-show="addressReady"
        >
          Copy
        </v-btn>
      </v-flex>
</template>

<script>
import { findPath } from '@/assets/views/btcSingleSig/receive.js'
import { displayAddress } from '@/assets/util/hwi/general.js'
import { createNamespacedHelpers } from 'vuex'
import { getunusedaddress, listAddresses } from '@/assets/util/btc/electrum/general.js'
const { mapState } = createNamespacedHelpers('bitcoinInfo')
const { clipboard } = require('electron')
export default {
  props: ['walletInfo'],
  data: () => ({
    unusedAddress: '',
    path: 'm/84h/1h/0h/0/',
    network: 'testnet',
    addressReady: false,
    addressGuess: ''
  }),
  computed: {
    ...mapState({
      singleSigInfo: state => state.btcSingleSig
    })
  },
  methods: {
    async setup () {
      const walletInfo = this.singleSigInfo
      const unusedAddress = await
      getunusedaddress(walletInfo.electrumWalletName, walletInfo.network,
        walletInfo.rpcport, walletInfo.rpcuser, walletInfo.rpcpassword)
      this.unusedAddress = unusedAddress.data.result
      const addressList = await
      listAddresses(walletInfo.electrumWalletName, walletInfo.rpcport,
        walletInfo.rpcuser, walletInfo.rpcpassword, walletInfo.network)
      const addressListLength = addressList.data.result.length
      const pathIndex = findPath(walletInfo.xpub, this.unusedAddress, addressListLength)
      this.path += pathIndex
      await this.showAddress()
    },
    copyToClipboard () {
      clipboard.writeText(this.unusedAddress, 'selection')
    },
    checkGuess () {
      const last4 = this.unusedAddress.slice(-4)
      if (this.addressGuess === last4) {
        this.addressReady = true
      }
    },
    async showAddress () {
      await displayAddress(this.walletInfo.model, this.walletInfo.path, this.path, this.network)
    }
  },
  async created () {
    await this.setup()
  }
}
</script>
