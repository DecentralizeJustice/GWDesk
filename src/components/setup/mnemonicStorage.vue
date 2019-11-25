<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Needed Mnemonic Hardware
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="">
    <v-row justify='center'
    >
      <v-col
        cols='9'
      >
      <v-card-text>
        <video style="width:100%;height:auto;" controls>
            <source :src='getvid()' type="video/mp4">
        </video>
      </v-card-text>
      </v-col>
      </v-row>
      <v-row
      >
      <v-col
        cols='6'
      >
      <v-card
      color='grey darken-2'
      >
      <v-card-title class="headline justify-center">
        Metal Storage Needed
      </v-card-title>
      <v-divider></v-divider>
        <v-card-text>
          <div>Tile Based Storage</div>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-container>

    <v-divider></v-divider>
    <v-card-actions>

      <v-btn
        color="indigo lighten-1"
        @click='back()'
      >
        Back
      </v-btn>
      <v-spacer/>
      <v-btn
        color="green"
        @click='nextOrder()'
      >
        Next Step
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import path from 'path'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    getvid: function () {
      return path.join(process.env.BASE_URL, 'videos/sample.mp4')
    },
    nextOrder () {
      this.$emit('next', 3)
    },
    back () {
      this.$emit('next', 1)
    }
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
