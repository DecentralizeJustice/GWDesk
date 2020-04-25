<template>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs11>
          <v-card flat>
            <v-divider class='mb-5'/>
            <div class="text-center">
            <v-btn
              color="orange"
              v-on:click="get()"
              class="mx-2 my-2"
            >
              Test Request
            </v-btn>
            </div>
          </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
import {
  finalizeTrans
} from '@/assets/util/btc/psbtUtil.js'
export default {
  components: {
  },
  data: () => ({
    psbt: 'cHNidP8BAHQCAAAAAQbJHPKysjoQL7Wp14NaqSvwSbp5Kb6HvnIJzfp5lzacAAAAAAD9////AhAnAAAAAAAAGXapFDRKD0jKFQ7CuQOBdmC5tosTpnAmiKwAXwEAAAAAABYAFDo6R3hsz/nPa1EsnO43dP7NpGDMbEUaAAABAR+ghgEAAAAAABYAFLKIli+FcPse3tUCzHiKAhvb1zeSIgYDFws1kBmrPheQWVtrsoJmj6yEFrG+HF+YQXXahO9sTAYMcOe/wQAAAAAAAAAAAAAiAgPnADp3xhbACZ6gd3fXwg0Gs3TtDlp0NIy4V/uU4bofpgxw57/BAQAAAAAAAAAA'
  }),
  methods: {
    finalizeTrans: async function () {
      const test = await finalizeTrans(this.psbt)
      console.log(test)
    }
  },
  computed: {
  },
  mounted () {
    this.getDevices()
  }
}
</script>
