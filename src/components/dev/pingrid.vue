<template>
  <v-container>
    <v-row v-for='i in 3' :key="i" align-content='center' justify='center'>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="4"
      >
      <div class="my-2">
        <v-btn large v-on:click='clicked(i,n)'></v-btn>
      </div>
      </v-col>
    </v-row>
    <v-row align-content='center' justify='center'>
      <v-col class="text-center" cols="12">
        <div class="my-1">
          <v-btn color="success" v-on:click='enter'>Enter Setup Pin</v-btn>
        </div>
      </v-col>
      <v-col class="text-center" cols="12">
        <div class="my-1">
          <v-btn color="blue" v-on:click='enterPin'>Enter Unlock Pin</v-btn>
        </div>
      </v-col>

      <v-col class="text-center" cols="4">
        <div class="my-2">
          <v-btn color="error" v-on:click='clear'>Clear</v-btn>
        </div>
      </v-col>
      <v-col class="text-center" cols="4">
        <div class="my-2">
          <v-btn color="blue" v-on:click='done'>Done</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'pingrid',
  components: {
  },
  data: () => ({
    pinString: ''
  }),
  methods: {
    clicked: function (i, n) {
      const rowInfo = [6, 3, 0]
      const rowAddition = rowInfo[i - 1]
      const pin = rowAddition + n
      this.pinString = this.pinString.concat(pin.toString(10))
    },
    done: async function () {
      this.$emit('exit')
    },
    clear: function () {
      this.pinString = ''
    },
    enter: function () {
      this.$emit('enter', this.pinString)
      this.done()
    },
    enterPin: function () {
      this.$emit('enterPin', this.pinString)
      this.done()
    }
  }
}
</script>
