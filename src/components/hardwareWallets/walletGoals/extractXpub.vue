<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Extracting Xpub
          </div>
        </v-col>
      </v-row>
  </v-card>
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
