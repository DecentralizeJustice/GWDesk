<template>
  <v-layout align-center justify-center row fill-height>

  <v-flex xs11>
    <mainPart v-if="introDone"/>
    <incompleteCard v-if="!introDone"/>
  </v-flex>
  </v-layout>

</template>

<script>
import mainPart from '@/components/sendMoney/main.vue'
import incompleteCard from '@/components/general/incompleteIntro.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('unlockedLessons')
export default {
  components: {
    mainPart,
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
