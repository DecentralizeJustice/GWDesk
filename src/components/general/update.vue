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
        :disabled='updateStarted'
        v-on:click="downloadUpdate()"
        v-if='updateAvailable'
      >
        Start Update Process
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'App',
  props: ['readyToShutdown', 'updateAvailable', 'updateStarted'],
  components: {
  },
  methods: {
    async downloadUpdate () {
      console.log('download update requested')
      this.$emit('downloadUpdate')
    }
  }
}
</script>
