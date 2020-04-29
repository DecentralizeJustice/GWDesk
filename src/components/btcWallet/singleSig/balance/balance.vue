<template>
  <v-container>
      <div class=" display-1 text-center">
        Balance:
      </div>
      <v-row
        no-gutters
        align="center"
        justify="center"
      >
        <v-col align="center"
            justify="center" xs12>
          <div class="display-1 mt-5">
            {{balance}} BTC
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
// const userConstants = createNamespacedHelpers('userConstants')
const { mapState } = createNamespacedHelpers('userConstants')
export default {
  components: {
  },
  data: () => ({
    transactions: [],
    currentBlock: 0,
    balance: 0
  }),
  methods: {
    async getBalance () {
    },
    async setup () {
      console.log(this.a)
    }
  },
  computed: {
    ...mapState({
      a: state => state.btcSingleSig
    })
  },
  async mounted () {
    await this.setup()
  }
}
</script>
<style scoped>

</style>
