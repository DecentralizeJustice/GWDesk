<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
        <incompleteCard v-if="!introDone"/>
          <v-card v-if="introDone">
            <v-card-text>
              <h2>Support</h2>
            </v-card-text>
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
import incompleteCard from '@/components/general/incompleteIntro.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('unlockedLessons')
export default {
  components: {
    incompleteCard
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
    ...mapGetters({
      introDone: 'introDone'
    })
  }
}
</script>
