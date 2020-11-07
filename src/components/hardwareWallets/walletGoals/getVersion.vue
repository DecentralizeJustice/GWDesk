<template>
  <v-card flat cols="12">
      <v-row justify="space-around">
        <v-col>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
            Getting Version
          </div>
        </v-col>
      </v-row>
  </v-card>
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
