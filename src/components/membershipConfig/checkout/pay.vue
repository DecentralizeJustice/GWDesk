<template>

      <v-flex xs8 offset-xs2>
        <v-card-text>
          <p class="mb-5 headline">How Would You Like To Pay?</p>
          <p class="mb-5 title">Bitcoin</p>
        <v-overflow-btn
        class="my-2"
        :items="dropdown_font"
        label="Phones and Tablets"
      ></v-overflow-btn>
        </v-card-text>
        </v-flex>

</template>

<script>
export default {
  data: () => ({
    dropdown_font: []
  }),
  created () {
    for (var i = 2; i < 16; i++) {
      this.dropdown_font.push(i)
    }
  }
}
</script>
