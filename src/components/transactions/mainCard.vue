<template>
  <v-container class="">
    <v-expansion-panels
        v-model="panel"
        multiple
      >

      <v-expansion-panel v-for="(item, index) in transactions" :key="item.txid"
      class="mt-2 light-blue darken-4">

      <v-expansion-panel-header>

          <v-card
            class='light-blue darken-4'
            :elevation="0"
          >

            <v-card-text class="mt-4 subtitle-1 white--text">
              <v-icon
              large v-bind:color="getColor(item.category)">
              {{getArrow (item.category)}}</v-icon>
              {{getType(item.category)}}
              {{item.amount}} BTC <v-divider/>
              {{getDate (item.blocktime)}}
            </v-card-text>

            <v-expansion-panel-content>
              <v-simple-table v-if="getType(item.category)==='sent'">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Inputs</th>
                      <th class="text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(stuff,index) in getInputInfo(item, index)" :key="index">
                      <td>{{ stuff.address }}</td>
                      <td>{{ stuff.value }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <v-simple-table v-if="getType(item.category)!=='sent'">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Input Addresses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(stuff,index) in getInputInfo(item, index)" :key="index">
                      <td v-if="stuff.address!==null">{{ stuff.address }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-simple-table class="mt-3">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Outputs</th>
                      <th class="text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(stuff,index) in getOutputInfo(item, index)" :key="index">
                      <td>{{ stuff.address }}</td>
                      <td>{{ stuff.value }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-card>

      </v-expansion-panel-header>
        </v-expansion-panel>

    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  props: ['transactions'],
  data: () => ({
    panel: []
  }),
  methods: {
    getType (type) {
      if (type === 'send') {
        return 'Sent'
      } else {
        return 'Recieved'
      }
    },
    getArrow (type) {
      if (type === 'send') {
        return 'mdi-arrow-top-left-thick'
      } else {
        return 'mdi-arrow-bottom-right-thick'
      }
    },
    getColor (type) {
      if (type === 'send') {
        return 'red darken-2'
      } else {
        return 'green darken-2'
      }
    },
    getDate (epoch) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]

      let time = ''
      const utcSeconds = epoch
      const d = new Date(0)
      d.setUTCSeconds(utcSeconds)
      const ampm = d.getHours() >= 12 ? 'pm' : 'am'
      let hours = d.getHours() % 12
      hours = hours ? hours : 12 // eslint-disable-line
      let minutes = d.getMinutes()
      minutes = minutes < 10 ? '0' + minutes : minutes
      time += days[d.getDay()]
      time += ' ' + d.getDate()
      time += ' ' + monthNames[d.getMonth()]
      time += ' ' + hours + ':' + minutes + ' ' + ampm
      return time
    },
    getTotalValueInput (info, index) {
      const type = info.category
      if (type === 'send') {
        const test = info.transactionInformation.inputs
        return test
      } else {
        return info.transactionInformation.inputs
      }
    },
    getInputInfo (info, index) {
      const type = info.category
      if (type === 'send') {
        const test = info.transactionInformation.inputs
        return test
      } else {
        return info.transactionInformation.inputs
      }
    },
    getOutputInfo (info, index) {
      const test = info.transactionInformation.outputs
      return test
    }
  },
  async mounted () {
  }
}
</script>
