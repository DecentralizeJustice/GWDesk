<template>

      <v-flex xs8 offset-xs2>
        <v-card-text>
          <h1 class="title">Send:</h1>
          {{membershipOptions.cost}} BTC
          <h1 class="title">To:</h1>
          {{this.address}}
        </v-card-text>
            <v-progress-circular
          indeterminate
          color="primary"
          class="mb-3"
        ></v-progress-circular>
        <v-slider
          v-model="volume"
          append-icon="mdi-turtle"
          prepend-icon="mdi-rabbit"
          label="Time"
          thumb-label
        ></v-slider>
        </v-flex>

</template>

<script>
export default {
  props: ['membershipOptions'],
  data: () => ({
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'
  })
}
</script>
