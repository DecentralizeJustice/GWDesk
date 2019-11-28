<template>

      <v-card
      class=""
      style=""
      >
      <v-card-title class="headline justify-center">
        Needed Hardware Summary
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
        cols='5'
      >
      <hardwareWallets/>
      </v-col>
      <v-col
        cols='4'
      >
      <computers/>
      </v-col>
      <v-col
        cols='3'
      >
      <metalStorage/>
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
import hardwareWallets from '@/components/setup/upToPay/components/hardwareWallets.vue'
import computers from '@/components/setup/upToPay/components/computers.vue'
import metalStorage from '@/components/setup/upToPay/components/metalStorage.vue'
export default {
  components: {
    metalStorage,
    computers,
    hardwareWallets
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
      this.$emit('next', 4)
    },
    back () {
      this.$emit('next', 2)
    }
  },
  async created () {
    // eslint-disable-next-line
    // this.filelocation = path.join(process.env.BASE_URL, 'sample.mp4')
  }
}
</script>
