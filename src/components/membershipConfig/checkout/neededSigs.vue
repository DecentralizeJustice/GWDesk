<template>
  <v-card-text>
    <v-alert type="info">
      {{advancedWarning}}
    </v-alert>
    <p class="mb-3 title">
      How Many Signatures Will Be Required for a Transaction?
    </p>
    <v-select
    class="mb-2"
    :items="neededSigssDropDown"
    label="Needed Signatures"
    v-model="neededSigs"
    v-bind:disabled="disabled"
    ></v-select>
  </v-card-text>
</template>

<script>
export default {
  props: ['hardwareOptions', 'disabled', 'minNumberneededSigs'],
  data: () => ({
    neededSigs: null,
    advancedWarning: 'You are using Advanced Settings. Make Informed Decisions.'
  }),
  computed: {
    neededSigssDropDown () {
      const options = []
      for (let i = this.minNumberneededSigs; i <
        this.hardwareOptions.hardwareWallets + 1; i++) {
        options.push(i)
      }
      return options
    }
  },
  methods: {
    rehydrate (hardwareOptions) {
      this.neededSigs = hardwareOptions.neededSigs
    }
  },
  watch: {
    neededSigs (newValue) {
      this.$emit('updateneededSigs', newValue)
    },
    hardwareOptions (newval, oldval) {
      this.rehydrate(newval)
    }
  },
  created: function () {
    this.rehydrate(this.hardwareOptions)
  }
}
</script>
