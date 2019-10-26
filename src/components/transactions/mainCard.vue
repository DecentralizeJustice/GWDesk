<template>
  <v-container class="">
      <v-row
        v-for="n in 1"
        :key="n"
        no-gutters
      >
        <v-col>
          <v-card
            class="pa-2 primary"
            tile
          >
            + 2.3 BTC
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
  data: () => ({
    receiveAddress: ''
  }),
  methods: {
  }
}
</script>
