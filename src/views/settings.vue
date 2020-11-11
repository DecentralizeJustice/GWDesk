<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
  <v-card :key='keyInfo'>
    <v-card-title class="headline justify-center">
      Settings
    </v-card-title>
    <v-divider></v-divider>
    <v-tabs>
      <!-- <v-tab>
        General
      </v-tab>
      <v-tab>
        Bitcoin
      </v-tab> -->
      <v-tab>
        Hardware Wallet
      </v-tab>
      <v-tab-item>
          <hardwareWallet/>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
    </v-tabs>
    <v-divider/>
    <v-card-actions>
    <v-btn
      color="orange"
      text
    >
      <v-icon>mdi-help</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      text
      @click='refresh()'
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-card-actions>
  </v-card>
</v-flex>
</v-layout>
</template>

<script>
import hardwareWallet from '@/components/settings/main.vue'
export default {
  components: {
    hardwareWallet
  },
  data: () => ({
    keyInfo: 1
  }),
  computed: {
  },
  methods: {
    refresh: function () {
      this.keyInfo = this.keyInfo * -1
    }
  },
  async mounted () {
  }
}
</script>
