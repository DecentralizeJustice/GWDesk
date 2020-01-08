<template>
  <v-card>
    <v-card-title class="headline justify-center">What is Cryptocurrency?</v-card-title>
    <v-divider/>
    <v-divider/>
    <v-card-actions>
      <v-btn
        color="green darken-1"
        text
        @click=""
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="green darken-1"
        text
        @click=""
      >
        Skip
      </v-btn>
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
      this.$emit('changeLesson', '')
    }
  }
}
</script>
