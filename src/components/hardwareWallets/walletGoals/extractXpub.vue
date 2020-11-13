<template>
  <v-col cols='12'>
    <v-row
      align="center"
      justify="space-around"
      class="mb-5"
    >
      <v-progress-circular
         indeterminate
         color="primary"
         :size="100"
       ></v-progress-circular>
    </v-row>
    <v-row
      align="center"
      justify="space-around"
      class="mt-5"
    >
    <v-alert
        color="black"
        dark
        type="info"
        border="left"
      >
      Extracting Xpub...
      </v-alert>
    </v-row>
  </v-col>
</template>

<script>
import {
  getxpub
} from '@/assets/util/hwi/general.js'
export default {
  props: ['walletInfo', 'goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    getxpub: async function () {
      const pub = await getxpub(this.walletInfo.model, this.walletInfo.path, this.goalInfo.xpubPath)
      return pub.xpub
    },
    emitXpub: function (pub) {
      this.$emit('goalCompleted', { xpub: pub })
    }
  },
  computed: {
  },
  async mounted () {
    const pub = await this.getxpub()
    this.emitXpub(pub)
  }
}
</script>
