<template>

      <v-flex xs10 offset-xs1>
        <v-card-text>
          <h1 class="display-1">Plan Overview</h1>
          <v-row
          >
            <v-col
            >
            <h2 class="title">Hardware Wallets:</h2>
            {{hardwareOptions.hardwareWallets}}
            <h2 class="title">Phone/Tablet Wallets:</h2>
            {{hardwareOptions.phonesOrTabletKeys}}
            <h2 class="title">Desktop Wallets:</h2>
            {{hardwareOptions.desktops-1}}
            <h2 class="title">Needed Signatures:</h2>
            {{hardwareOptions.neededSigs}}
            </v-col>
            <v-col
            >
            <h2 class="title">Membership Months:</h2>
            {{membershipOptions.months}}
            <h2 class="title">Max Stored:</h2>
            {{membershipOptions.amount}} BTC
            <h2 class="title">Total Cost:</h2>
            {{membershipOptions.cost}} BTC
            </v-col>
          </v-row>
        </v-card-text>
        </v-flex>

</template>

<script>
export default {
  props: ['hardwareOptions', 'membershipOptions'],
  data: () => ({

  }),
  computed: {
  },
  watch: {
  },
  created () {
  }
}
</script>
