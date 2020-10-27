<template>
  <v-card class="text-center flat" style="background-color: grey;">
    <v-container>
      <v-row justify="center">
        <v-col cols="5">
          <v-img
            :src="walletPhoto"
          ></v-img>
        </v-col>
        <v-col
          cols="12"
        >
        <v-btn color="green" @click="walletSelected">
          Select
        </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import image1 from '@/assets/photos/trezormodelt.jpeg'
export default {
  props: ['walletInfo', 'goal'],
  components: {
  },
  data: () => ({
    dialog: false,
    pingridUse: false
  }),
  methods: {
    walletReady: function () {
      this.$emit('walletSelected')
    }
  },
  computed: {
    walletPhoto: function () {
      return image1
    },
    model: function () {
      return this.walletInfo.model
    },
    path: function () {
      return this.walletInfo.path
    }
  },
  mounted () {
  }
}
</script>
