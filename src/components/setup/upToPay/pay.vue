<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Buy Membership
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
        cols='12'
      >
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
        color="indigo lighten-1"
        @click='paid()'
      >
        Paid
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import path from 'path'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('stageInfo')
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
    back () {
      this.$emit('next', 3)
    },
    ...mapActions([
      'paid'
    ])
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
