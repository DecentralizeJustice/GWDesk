<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
            <v-divider class='mb-5'/>
            <div class="text-center">
            <v-btn
              color="orange"
              v-on:click="finalizeTrans()"
              class="mx-2 my-2"
            >
              Finalize Trans
            </v-btn>
            <v-btn
              color="purple darken-4"
              v-on:click="transactionFromPSBT()"
              class="mx-2 my-2"
            >
              Get Transaction
            </v-btn>
            </div>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  finalizeTrans, transactionFromPSBT
} from '@/assets/util/btc/psbtUtil.js'
export default {
  components: {
  },
  data: () => ({
    psbt1:
    'cHNidP8BAFUCAAAAAQbJHPKysjoQL7Wp14NaqSvwSbp5Kb6HvnIJzfp5lzacAAAAAAD9////AS+GAQAAAAAAGXapFDRKD0jKFQ7CuQOBdmC5tosTpnAmiKxIRhoAAAEBH6CGAQAAAAAAFgAUsoiWL4Vw+x7e1QLMeIoCG9vXN5IiBgMXCzWQGas+F5BZW2uygmaPrIQWsb4cX5hBddqE72xMBgxw57/BAAAAAAAAAAAAAA==',
    psbt2:
    'cHNidP8BAFUCAAAAAQbJHPKysjoQL7Wp14NaqSvwSbp5Kb6HvnIJzfp5lzacAAAAAAD/////AS+GAQAAAAAAGXapFDRKD0jKFQ7CuQOBdmC5tosTpnAmiKwAAAAAAAEBH6CGAQAAAAAAFgAUsoiWL4Vw+x7e1QLMeIoCG9vXN5IiAgMXCzWQGas+F5BZW2uygmaPrIQWsb4cX5hBddqE72xMBkgwRQIhANtSB+9OkFRcU6YKP4naDBUhHdjQh1P63VEZhko4ha7iAiAziD4uBnanDICqrENQO0+ofDSmEcXYzo9+Yjcjo5zUWgEiBgMXCzWQGas+F5BZW2uygmaPrIQWsb4cX5hBddqE72xMBhiuqiVkVAAAgAEAAIAAAACAAAAAAAAAAAAAAA=='
  }),
  methods: {
    finalizeTrans: async function () {
      const test = await finalizeTrans(this.psbt2)
      console.log(test)
    },
    transactionFromPSBT: async function () {
      const test = await transactionFromPSBT(this.psbt1)
      console.log(test)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
