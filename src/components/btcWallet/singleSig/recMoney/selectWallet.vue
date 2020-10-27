<template>

      <v-flex xs12>
        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline" >Unlock 'My Trezor' Hardware Wallet</h3>
          </div>
        </v-card-title>
        <walletTool
        v-on:walletReady='walletReady'/>
        </v-flex>

</template>

<script>
import walletTool from '@/components/hardwareWallets/mainWalletTool.vue'
export default {
  components: {
    walletTool
  },
  props: [],
  data: () => ({
  }),
  computed: {
  },
  methods: {
    walletReady: function (walletInfo) {
      this.$emit('walletReady', walletInfo)
    }
  },
  created () {
  }
}
</script>
