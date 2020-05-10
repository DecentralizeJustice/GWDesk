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
  finalizeTrans, validPSBTFromPSBT
} from '@/assets/util/btc/psbtUtil.js'
export default {
  components: {
  },
  data: () => ({
    psbt1:
    'cHNidP8BAHICAAAAAfX6PsuuDLyE68XlJ+R5sRivu9yxGSue5G0FSfxvEb1zAQAAAAD9////AjUEAAAAAAAAFgAUSDitwi6MALdnN67X2HpMGn4HUp7QBwAAAAAAABepFP/Q27REAtX48S2bpbSEosG7R9pChx1HGgAAAQEf2gwAAAAAAAAWABQ6Okd4bM/5z2tRLJzuN3T+zaRgzCIGA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mDHDnv8EBAAAAAAAAAAAiAgOkieFQPL5thWHFvSIeXGeDCTE39GKLDHaiULYexuryKAxw57/BAQAAAAEAAAAAAA==',
    psbt2:
    'cHNidP8BAHICAAAAAfX6PsuuDLyE68XlJ+R5sRivu9yxGSue5G0FSfxvEb1zAQAAAAD9////AjUEAAAAAAAAFgAUSDitwi6MALdnN67X2HpMGn4HUp7QBwAAAAAAABepFP/Q27REAtX48S2bpbSEosG7R9pChx1HGgAAAQEf2gwAAAAAAAAWABQ6Okd4bM/5z2tRLJzuN3T+zaRgzCICA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mSDBFAiEAs9XirjFSGngxGgWcyynd5CrEhkwBNj8bHnJ7w02STXECIGiL576FMf7zMRlYDtnY+rUBcLl5c+vkQdvpmC3MdIM3ASIGA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mGK6qJWRUAACAAQAAgAAAAIABAAAAAAAAAAAiAgOkieFQPL5thWHFvSIeXGeDCTE39GKLDHaiULYexuryKBiuqiVkVAAAgAEAAIAAAACAAQAAAAEAAAAAAA=='
  }),
  methods: {
    finalizeTrans: async function () {
      const test = await finalizeTrans(this.psbt2)
      console.log(test)
    },
    transactionFromPSBT: async function () {
      const test = await validPSBTFromPSBT(this.psbt1)
      console.log(test)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
