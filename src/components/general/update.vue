<template>
  <v-card>
    <v-card-title
      class="headline"
      primary-title
    >
      An Update Is Available
    </v-card-title>

    <v-card-text class="body-1">
      Guiding Wallet needs to update. Click Finish Update whenever you are ready to proceed.
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        v-on:click="shutdownAndInstall()"
        v-if='readyToShutdown'
      >
        Finish Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'App',
  props: ['readyToShutdown'],
  components: {
  },
  methods: {
    async shutdownAndInstall () {
      this.$emit('shutdown')
    }
  }
}
</script>
