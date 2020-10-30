<template>
  <v-container>
      <mainWalletComp
      v-bind:goal='goal'
      v-bind:goalInfo='goalInfo'
      :key='keyStuff'
      v-if='!addressReady'/>
      <v-flex xs12>
        <v-card-title  v-show="!addressReady" primary-title class="justify-center">
          <div>
            <h3 class="headline" >Enter The Last 4 Characters of Address:</h3>
          </div>
        </v-card-title>
        <v-container v-show="!addressReady">
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
          v-show="!addressReady"
        >
          Show Address Again
        </v-btn>
        <v-btn
          color="blue"
          v-on:click="copyToClipboard()"
          v-show="addressReady"
        >
          Copy Address
        </v-btn>
      </v-flex>
  </v-container>
</template>
<script>
import mainWalletComp from '@/components/hardwareWallets/mainWalletTool.vue'
import { findPath } from '@/assets/views/btcSingleSig/receive.js'
import { getunusedaddress, listAddresses } from '@/assets/util/btc/electrum/general.js'
import { mapState, mapGetters } from 'vuex'
const { clipboard } = require('electron')
export default {
  components: {
    mainWalletComp
  },
  data: () => ({
    unusedAddress: '',
    path: '',
    addressReady: false,
    addressGuess: '',
    goal: 'showAddress',
    goalInfo: { path: '', network: '' },
    addressOnWallet: true,
    keyStuff: 0
  }),
  methods: {
    setup: async function () {
      const walletInfo = this.btcSingleSigTestnet
      const unusedAddress = await
      getunusedaddress(this.singleSigElectrumName, walletInfo.network,
        walletInfo.rpcport, walletInfo.rpcuser, walletInfo.rpcpassword)
      this.unusedAddress = unusedAddress.data.result
      const addressList = await
      listAddresses(this.singleSigElectrumName, walletInfo.rpcport,
        walletInfo.rpcuser, walletInfo.rpcpassword, walletInfo.network)
      const addressListLength = addressList.data.result.length
      const pathIndex = await findPath(this.singleSigHardwareWalletInfo.vpub, this.unusedAddress, addressListLength)
      this.path = this.singleSigHardwareWalletInfo.vpubPath + '/0/'
      this.path += pathIndex
    },
    copyToClipboard: function () {
      clipboard.writeText(this.unusedAddress, 'selection')
    },
    checkGuess: function () {
      const last4 = this.unusedAddress.slice(-4)
      if (this.addressGuess === last4) {
        this.addressReady = true
      }
    },
    showAddress: async function () {
      if (this.keyStuff === 0) {
        this.keyStuff = 1
      } else {
        this.keyStuff = 0
      }
    }
  },
  computed: {
    ...mapState('bitcoinInfo', [
      'btcSingleSigTestnet'
    ]),
    ...mapGetters('hardwareInfo', [
      'singleSigElectrumName',
      'singleSigHardwareWalletInfo'
    ])
  },
  async mounted () {
    await this.setup()
    this.goalInfo.path = this.path
    this.goalInfo.network = this.btcSingleSigTestnet.network
  }
}
</script>
