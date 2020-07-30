<template>
  <v-card >
    <div v-if='!torReady'>
      <v-card-title
        primary-title
        class="justify-center headline"
      >
        Setting Up Tor Network Circuits
      </v-card-title>
        <v-divider></v-divider>
      <div class="text-center pt-9 pb-9" style='width:100%;height:100%;'>
      <v-progress-circular
        :size="100"
        color="purple"
        indeterminate
      ></v-progress-circular>
      </div>
    </div>
    <div v-if='torReady'>
    <v-card-title
      class="headline"
      primary-title
      justify-center
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
  </div>
  </v-card>
</template>

<script>
export default {
  name: 'App',
  props: ['readyToShutdown', 'updateAvailable', 'updateStarted', 'torReady'],
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
