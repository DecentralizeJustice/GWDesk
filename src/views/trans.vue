<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs10>
          <v-card >
            <v-card-title class="headline justify-center">
              Transactions
            </v-card-title>
            <v-divider></v-divider>

            <mainCard class="" style=" height: 75vh;overflow: scroll;"/>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import mainCard from '@/components/transactions/mainCard.vue'
export default {
  components: {
    mainCard
  },
  data: () => ({
  }),
  methods: {
  },
  async mounted () {
  }
}
</script>
<style scoped>

</style>
