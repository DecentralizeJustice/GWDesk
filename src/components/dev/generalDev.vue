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
            <v-btn
              color="red darken-4"
              v-on:click="decodePsbt()"
              class="mx-2 my-2"
            >
              Decode
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
const psbtTools = require('psbt')
const bitcoin = require('bitcoinjs-lib')
export default {
  components: {
  },
  data: () => ({
    psbt1:
    'cHNidP8BAHICAAAAAcEkrsVv76kUsgzpNM8Uu0WYz2VtHXFb6GzuADQ03eA/AgAAAAD9////AugDAAAAAAAAF6kU/9DbtEQC1fjxLZultISiwbtH2kKHqh8AAAAAAAAWABSIGp3MShw7OZvf04Lw14X8JsdmNFicGgAAAQEfkiQAAAAAAAAWABRAVRljyt4PsL5qC+Cf7qVoVeJQLyIGAz0Gw9j9gNZHnNsP3Gek8E+KvpFSaKqzIOF7VnywDzXxDHDnv8EBAAAACQAAAAAAIgIDDHbYbeC+EIl1GvSaX5n6NMBWEsNc9S90UPoo8blHLHcMcOe/wQEAAAAKAAAAAA==',
    psbt2:
    'cHNidP8BAHICAAAAAfX6PsuuDLyE68XlJ+R5sRivu9yxGSue5G0FSfxvEb1zAQAAAAD9////AjUEAAAAAAAAFgAUSDitwi6MALdnN67X2HpMGn4HUp7QBwAAAAAAABepFP/Q27REAtX48S2bpbSEosG7R9pChwAAAAAAAQEf2gwAAAAAAAAWABQ6Okd4bM/5z2tRLJzuN3T+zaRgzCICA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mSDBFAiEAuPpzoGehf1FRQtJyOhWmnzplSncNY0K8n+M7BsBOK3wCIDgxE8J9RpcnvWBu7AI/7nBQy3aX1pYd5t4LHTsLOqQVASIGA+cAOnfGFsAJnqB3d9fCDQazdO0OWnQ0jLhX+5Thuh+mGK6qJWRUAACAAQAAgAAAAIABAAAAAAAAAAAiAgOkieFQPL5thWHFvSIeXGeDCTE39GKLDHaiULYexuryKBiuqiVkVAAAgAEAAIAAAACAAQAAAAEAAAAAAA==',
    pbst4:
    'cHNidP8BAFICAAAAAb+WnT16PfXuOW5xik1YNgMJo0uhui8t2tnwI04LIAOCAAAAAAD9////AZIOAQAAAAAAFgAU3RacollkleIxk+lz8my/mLCXiH3obxwAAAEA/egBAgAAAAABA7jQHOtpvtA9sb/Znz7X6eg3PucNYUBYZbnYvnYgNipHAAAAAAD9////4dnLsJyC+RaBLjepvKz2m8PsimypuvkRWOC79svSBMMAAAAAAP3////996L6yACtEDyX7OebOF4Z95PXf5f8pdBc9nZz/piz8gAAAAAA/f///wE3DwEAAAAAABYAFH0TrtTd5i87gtP/mAE0SsqCbEhPAkcwRAIgOsn2jkTqpwWRFwl4x70n9R2v+pI0izi+bdprYK0AH1gCIEOhHWgWUSIovV2dgaYZLAjhv/JZqI2QWS/Q2k9j0DHEASEDeFtLDAv0jsHPHBO/i3JBADyxzwEmOqWb04+fbLe9qzgCSDBFAiEApyoI3TgLCDQe5dj8gpxAAZYUrhGHOv1slE4RFE8Z5dsCIHDJUQOaIKznmfomxpSbumg8/fvRo+2p3mw+LQoFnML7ASEDbcGB21wH38VeUZoGnOOYRoRmwhQip78DtFOpC8K9egUCRzBEAiBuN0+hNgRcVzJDePjoLvoeemPXtEd9/BJFdkgCQxg/+QIgc5+yUu4PwKIInba2Ye3GqGcmwVWUgXrEyYkFuYxYeUABIQN4W0sMC/SOwc8cE7+LckEAPLHPASY6pZvTj59st72rOOdvHAAiBgKn4O5t4J8XaubCP6ruBTSc1HkYmNZhuVclRe7TFtcjfwytXPTrAAAAAAsAAAAAAA=='
  }),
  methods: {
    finalizeTrans: async function () {
      const test = await finalizeTrans(this.psbt2)
      console.log(test)
    },
    transactionFromPSBT: async function () {
      const test = await validPSBTFromPSBT(this.psbt1)
      console.log(test)
    },
    decodePsbt: async function () {
      const buff = Buffer.from(this.pbst4, 'base64')
      const hex = buff.toString('hex')
      const transHex = psbtTools.decodePsbt({ psbt: hex })
      const wrongPsbt = bitcoin.Psbt.fromBase64(this.pbst4)
      console.log(transHex)
      console.log(wrongPsbt)
      const bitcoinJSTrans = bitcoin.Transaction.fromHex(transHex.unsigned_transaction)
      console.log(bitcoinJSTrans)
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
