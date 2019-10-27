<template>
  <v-container class="">
      <v-row
        v-for="n in 1"
        :key="n"
        no-gutters
      >
        <v-col>
          <v-hover v-slot:default="{ hover }">
          <v-card
            :class="{ 'on-hover': hover }"
            class='primary'
            link
            :elevation="hover ? 12 : 2"
          >

          <v-card-text class="ma-4 subtitle-1 black--text">
            <v-icon>mdi-arrow-bottom-right-thick</v-icon> Recieved
          </v-card-text>
          </v-card>
        </v-hover>
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
