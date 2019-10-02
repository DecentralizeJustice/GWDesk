<template>

      <v-flex xs10 offset-xs1>
        <v-card-text>

          <p class="mb-5 display-1">Plan Overview</p>
          <p class="title">Hardware Wallets</p>
          {{hardwareOptions.hardwareWallets}}
          <p class="title">Phone/Tablet Wallets</p>
          {{hardwareOptions.phonesOrTabletKeys}}
          <p class="title">Desktop Wallets</p>
          {{hardwareOptions.desktops-1}}
          <p class="title">Needed Signatures</p>
          {{hardwareOptions.neededDevices}}

        </v-card-text>
        </v-flex>

</template>

<script>
export default {
  props: ['hardwareOptions'],
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
