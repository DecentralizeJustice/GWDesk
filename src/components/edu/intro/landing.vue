<template>
  <v-card>
    <v-card-title class="headline">Use Google's location service?</v-card-title>
    <v-divider/>
    <v-card-text>
      Intro Courseu
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click="exit()"
      >
        Exit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    componentList: {
    }
  }),
  components: {
  },
  computed: {
  },
  methods: {
    exit () {
      this.$emit('exit')
    }
  }
}
</script>
