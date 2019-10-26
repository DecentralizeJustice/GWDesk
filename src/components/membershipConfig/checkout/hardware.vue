<template>
<v-flex xs10 offset-xs1>
  <v-card-text>
    <v-alert type="error" v-if="!minDevicesAchieved && allChosen">
      {{minDevicesWarning}}
    </v-alert>
    <p class="mb-5 headline">What Hardware do you plan to use?</p>

    <v-select
    class="my-2"
    :items="hardwareWalletdropdown"
    label="Hardware Wallets"
    v-model="hardwareWallets"
    />

    <v-select
    class="my-2"
    :items="desktopDropdown"
    label="Desktops"
    v-bind:disabled="desktopDisabled"
    v-model="desktops"
    />

    <v-select
    class="my-2"
    :items="phoneAndTabletDropdown"
    label="Phones and Tablets"
    v-bind:disabled="phoneAndTabletDisabled"
    v-model="phonesOrTabletKeys"
    ></v-select>

  </v-card-text>
  <neededSigs v-if='hardwareAdvancedOption'
    v-bind:neededSigs="neededSigs"
    v-bind:hardwareOptions="hardwareOptions"
    v-bind:disabled="neededSigsDisabled"
    v-on:updateneededSigs='updateneededSigs'
    v-bind:minNumberneededSigs='minNumberneededSigs'
    />

</v-flex>
</template>

<script>
import neededSigs from '@/components/membershipConfig/checkout/neededSigs.vue'
export default {
  components: {
    neededSigs
  },
  props: ['hardwareOptions', 'hardwareAdvancedOption'],
  data: () => ({
    totalHadwareKeysAllowed: 3,
    minKeyDevices: 3,
    minDesktopComp: 1,
    minDevicesWarning: 'You Must Use Atleast 4 Devices',
    hardwareWallets: null,
    desktops: null,
    phonesOrTabletKeys: null,
    neededSigs: null
  }),
  created () {
    if (Object.keys(this.hardwareOptions).length !== 0) {
      this.hardwareWallets = this.hardwareOptions.hardwareWallets
      this.desktops = this.hardwareOptions.desktops
      this.phonesOrTabletKeys = this.hardwareOptions.phonesOrTabletKeys
      this.neededSigs = this.hardwareOptions.neededSigs
    }
  },
  methods: {
    updateneededSigs (newneededSigs) {
      this.neededSigs = newneededSigs
    }
  },
  computed: {
    availableSoftwareKeys: function () {
      const availKeys = this.hardwareWallets -
      this.desktopKeys - this.phonesOrTabletKeys - 1
      return availKeys
    },
    minNumberneededSigs: function () {
      return this.desktopKeys + this.phonesOrTabletKeys + 1
    },
    reccommendedneededSigs: function () {
      if (this.desktops === 1 && this.phonesOrTabletKeys === 0) {
        return this.hardwareWallets - 1
      } else {
        return this.hardwareWallets
      }
    },
    desktopKeys: function () {
      return this.desktops - this.minDesktopComp
    },
    hardwareWalletdropdown: function () {
      const options = []
      for (let i = 2; i < this.totalHadwareKeysAllowed + 1;
        i++) {
        options.push(i)
      }
      return options
    },
    desktopDropdown: function () {
      const options = []
      for (let i = this.minDesktopComp; i < this.availableSoftwareKeys +
        this.desktops + 1; i++) {
        options.push(i)
      }
      return options
    },
    phoneAndTabletDropdown: function () {
      const options = []
      for (let i = 0; i < this.availableSoftwareKeys + this.phonesOrTabletKeys +
        1; i++) {
        options.push(i)
      }
      return options
    },
    desktopDisabled: function () {
      if (this.hardwareWallets !== null) {
        return false
      }
      return true
    },
    phoneAndTabletDisabled: function () {
      if (this.desktops !== null) {
        return false
      }
      return true
    },
    neededSigsDisabled: function () {
      if (this.phonesOrTabletKeys !== null) {
        return false
      }
      return true
    },
    allChosen: function () {
      if (this.hardwareWallets !== null &&
        this.desktops !== null &&
        this.phonesOrTabletKeys !== null &&
        ((this.neededSigs !== null &&
          this.hardwareAdvancedOption) || !this.hardwareAdvancedOption)
      ) {
        return true
      } return false
    },
    minDevicesAchieved: function () {
      if (this.hardwareWallets + this.desktops +
        this.phonesOrTabletKeys >= this.minKeyDevices + this.minDesktopComp) {
        return true
      } return false
    },
    localhardwareOptions: function () {
      let devicesNeeded
      if (this.hardwareAdvancedOption) {
        devicesNeeded = this.neededSigs
      } else {
        devicesNeeded = this.reccommendedneededSigs
      }
      return {
        hardwareWallets: this.hardwareWallets,
        desktops: this.desktops,
        phonesOrTabletKeys: this.phonesOrTabletKeys,
        hardwareAdvancedOption: this.hardwareAdvancedOption,
        neededSigs: devicesNeeded
      }
    },
    validPlan: function () {
      if (this.allChosen && this.minDevicesAchieved) {
        return this.localhardwareOptions
      }
      return {}
    }
  },
  watch: {
    validPlan (newOptions) {
      this.$emit('updatePlanOptions', newOptions)
    },
    hardwareWallets (newOptions, oldOptions) {
      if (newOptions < oldOptions &&
        (this.desktops + this.phonesOrTabletKeys > newOptions) &&
          (this.desktops !== null && this.phonesOrTabletKeys !== null)) {
        this.desktops = 1
        this.phonesOrTabletKeys = 0
      }
    }
  }
}
</script>
