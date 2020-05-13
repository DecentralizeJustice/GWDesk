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
    'cHNidP8BAHICAAAAAcEkrsVv76kUsgzpNM8Uu0WYz2VtHXFb6GzuADQ03eA/AgAAAAD9////AugDAAAAAAAAF6kU/9DbtEQC1fjxLZultISiwbtH2kKHqh8AAAAAAAAWABSIGp3MShw7OZvf04Lw14X8JsdmNFicGgAAAQEfkiQAAAAAAAAWABRAVRljyt4PsL5qC+Cf7qVoVeJQLyIGAz0Gw9j9gNZHnNsP3Gek8E+KvpFSaKqzIOF7VnywDzXxDHDnv8EBAAAACQAAAAAAIgIDDHbYbeC+EIl1GvSaX5n6NMBWEsNc9S90UPoo8blHLHcMcOe/wQEAAAAKAAAAAA==',
    psbt2:
    'cHNidP8BAHICAAAAAfX6PsuuDLyE68XlJ+R5sRivu9yxGSue5G0FSfxvEb1zAQAAAAD9////AjUEAAAAAAAAFgAUSDitwi6MALdnN67X2HpMGn4HUp7QBwAAAAAAABepFP/Q27REAtX48S2bpbSEosG7R9pChwAAAAAAAQEf2gwAAAAAAAAWABQ6Okd4bM/5z2tRLJzuN3T+zaRgzCICA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mSDBFAiEAuPpzoGehf1FRQtJyOhWmnzplSncNY0K8n+M7BsBOK3wCIDgxE8J9RpcnvWBu7AI/7nBQy3aX1pYd5t4LHTsLOqQVASIGA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mGK6qJWRUAACAAQAAgAAAAIABAAAAAAAAAAAiAgOkieFQPL5thWHFvSIeXGeDCTE39GKLDHaiULYexuryKBiuqiVkVAAAgAEAAIAAAACAAQAAAAEAAAAAAA=='
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
