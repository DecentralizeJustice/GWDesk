<template>
  <v-row no-gutters align-content='center' justify='center'>
    <v-col
      cols="10"
    >
    <v-card :key='keyInfo' class="grey darken-3" >
      <v-card-title class="headline justify-center">
        Settings
      </v-card-title>
      <v-divider></v-divider>
      <v-tabs>
        <v-tab>
          Hardware Wallet
        </v-tab>
        <v-tab-item>
          <hardwareWallet/>
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
    </v-col>
  </v-row>
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
