<template>
  <v-layout>
  </v-layout>
</template>

<script>
export default {
  mounted () {
    this.$router.push(
      {
        name: this.routeInfo.name,
        params: {
          ...this.routeInfo
        }
      })
  },
  components: {
  },
  props: ['routeInfo']
}
</script>
