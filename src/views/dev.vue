<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs9>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-spacer/>
      <v-toolbar-title>Dev Pannel</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-tabs>
      <v-tab>
        HWI
      </v-tab>
      <v-tab>
        Electrum
      </v-tab>
      <v-tab>
        General
      </v-tab>
      <v-tab>
        Trezor Cli
      </v-tab>
      <v-tab>
        Tor
      </v-tab>
      <v-tab-item>
        <hwi />
      </v-tab-item>
      <v-tab-item>
        <electrum/>
      </v-tab-item>
      <v-tab-item>
        <general/>
      </v-tab-item>
      <v-tab-item>
        <trezorCli/>
      </v-tab-item>
      <v-tab-item>
        <tor/>
      </v-tab-item>
    </v-tabs>
  </v-card>
</v-flex>
</v-layout>
</template>

<script>
import hwi from '@/components/dev/hwiDev.vue'
import electrum from '@/components/dev/electrumDev.vue'
import general from '@/components/dev/generalDev.vue'
import trezorCli from '@/components/dev/trezorCliDev.vue'
import tor from '@/components/dev/tor.vue'
export default {
  components: {
    hwi,
    electrum,
    general,
    trezorCli,
    tor
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
  async mounted () {
  }
}
</script>
