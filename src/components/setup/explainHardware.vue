<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Needed Computing Hardware
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
        Needed Hardware Wallets
      </v-card-title>
      <v-divider></v-divider>
        <v-card-text>
          <div>ColdCard</div>
          <v-list-item>
      <v-list-item-content>
        <v-list-item-title>2 ColdCards</v-list-item-title>
        <v-list-item-title>Micro SD Card</v-list-item-title>
        <v-list-item-title>Micro-USB Cable</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-alert type="warning">
    Buy From 2 Differnt Places
    </v-alert>
        </v-card-text>
      </v-card>
      </v-col>
      <v-col
        cols='6'
      >
      <v-card
      color='grey darken-1'
      >
      <v-card-title class="headline justify-center">
        Needed Computers
      </v-card-title>
      <v-divider></v-divider>
        <v-card-text>
          <div>Desktop Computer</div>
          <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Able To Install Apps</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
        </v-card-text>
        <v-card-text>
          <div>Phone or Tablet</div>
          <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Web Browser Required</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
    // videoPlayer
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
      this.$emit('next', 2)
    },
    back () {
      this.$emit('next', 0)
    }
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
