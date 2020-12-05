<template>
  <div class="text-center ma-8">
    <div>Loading.....</div>
    <v-progress-circular
      :size="70"
      :width="7"
      color="green"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: [],
  components: {
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
  watch: {
  },
  async mounted () {
  }
}
</script>
