<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
  <v-card>
    <v-card-title class="headline justify-center">
      Settings
    </v-card-title>
    <v-divider></v-divider>
    <v-tabs>
      <v-tab>
        General
      </v-tab>
      <v-tab>
        Hardware Wallet
      </v-tab>
      <v-tab>
        Bitcoin
      </v-tab>
      <v-tab-item>
      </v-tab-item>
      <v-tab-item>
          <hardwareWallet/>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
    </v-tabs>
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
  }),
  computed: {
  },
  methods: {
  },
  async mounted () {
  }
}
</script>
