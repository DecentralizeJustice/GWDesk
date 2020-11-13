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
      Getting Version...
      </v-alert>
    </v-row>
  </v-col>
</template>

<script>
import {
  getVersionNumber
} from '@/assets/util/trezorCli/general.js'
export default {
  props: ['goalInfo'],
  components: {
  },
  data: () => ({
  }),
  methods: {
    getVersionNumber: async function () {
      const version = await getVersionNumber()
      return version
    },
    emitVersion: function (version) {
      this.$emit('goalCompleted', { version: version })
    }
  },
  computed: {
  },
  async mounted () {
    const version = await this.getVersionNumber()
    this.emitVersion(version)
  }
}
</script>
