<template>
  <v-row justify='space-around' align='center'>
    <v-col cols='6' v-show="!addressReady">
      <mainWalletComp
      v-bind:goal='goal'
      v-bind:goalInfo='goalInfo'
      :key='keyStuff'
      v-if='!addressReady'/>
    </v-col>
    <v-col cols='6' v-show="!addressReady">
      <v-row>
        <v-col cols='12'>
          <div primary-title class="justify-center">
            <h3 class="headline" >Enter The Last 4 Characters of Address:</h3>
          </div>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="addressGuess" v-on:input="checkGuess"
                label="Last 4 Characters"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            color="deep-purple darken-4"
            v-on:click="showAddress()"
          >
            Show Address Again
          </v-btn>
      </v-col>
      </v-row>
    </v-col>
    <v-col cols='6' v-show="addressReady" class="">
      <v-row justify='space-around' align='center' class="ma-5">
            {{unusedAddress}}
      </v-row>
      <v-row justify='space-around' align='center' class="mt-5">
          <v-btn
            color="blue"
            v-on:click="copyToClipboard()"
            v-show="addressReady"
          >
            Copy Address
          </v-btn>
      </v-row>
    </v-col>
  </v-row>
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
    this.goalInfo.masterFingerprint = this.singleSigHardwareWalletInfo.fingerprint
    this.goalInfo.path = this.path
    this.goalInfo.network = this.btcSingleSigTestnet.network
  }
}
</script>
