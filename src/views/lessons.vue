<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters">
        <v-card-title class="headline justify-center">
          Lessons
        </v-card-title>
            <v-divider></v-divider>
            <v-row no-gutters justify-content='space-evenly'>
               <v-col :key="item.title" v-for="(item) in lessons" cols='4'>
                 <v-card
                   class="ma-3" :color="cardColor(item.unlocked)"
                 >
                 <v-card-title class="headline justify-center">
                   {{item.title}}
                 </v-card-title>
                 <v-row no-gutters justify-content='center' >
                  <v-col cols='2' offset='5' class="justify-center text-center">
                    <v-icon x-large :color="iconColor(item.unlocked)" class="" style="">
                      mdi-{{item.icon}}
                    </v-icon>
                  </v-col>
                </v-row>
                 <v-card-actions class="justify-center">
                   <v-btn
                     :disabled='!item.unlocked'
                     :color="iconColor(true)"
                     @click.stop="openDialog(item.title)"
                   >
                     Explore
                   </v-btn>
                 </v-card-actions>
                 </v-card>
               </v-col>
            </v-row>
            <!-- <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
    >
    <subjectHome
    v-bind:routeInfo='routeInfo'
    v-bind:landingInfo="landingInfoPicker"
    v-bind:setLesson="this.routeInfo.lesson"
    v-on:exit="dialog = false"/>
    </v-dialog>
    </v-layout>
</template>

<script>
import subjectHome from '@/components/edu/subjectHome.vue'
import introLandingInfo from '@/assets/landingInfo/intro.js'
import btcLandingInfo from '@/assets/landingInfo/btc.js'
import coinbaseInfo from '@/assets/landingInfo/coinbase.js'
import exodusInfo from '@/assets/landingInfo/exodus.js'
import walletInfo from '@/assets/landingInfo/wallet.js'
export default {
  mounted () {
    if (typeof this.routeInfo.lessonCategory !== 'undefined') {
      this.openDialog(this.routeInfo.lessonCategory)
    }
  },
  components: {
    subjectHome
  },
  props: ['routeInfo'],
  data: () => ({
    dialog: false,
    currentLesson: '',
    lessonMapping: {
      Introduction: introLandingInfo,
      Bitcoin: btcLandingInfo,
      Coinbase: coinbaseInfo,
      Exodus: exodusInfo,
      Wallet: walletInfo
    },
    lessons: [
      { title: 'Introduction', icon: 'atom-variant', unlocked: true },
      { title: 'Bitcoin', icon: 'lock', unlocked: true },
      { title: 'Coinbase', icon: 'book-information-variant', unlocked: true },
      { title: 'Exodus', icon: 'book-information-variant', unlocked: true },
      { title: 'Wallet', icon: 'lock', unlocked: true },
      { title: 'General', icon: 'atom-variant', unlocked: false },
      { title: 'Monero', icon: 'eye-off', unlocked: false },
      // { title: 'Dai', icon: 'lock', unlocked: 'false' },
      // { title: 'Pool Together', icon: 'lock', unlocked: 'false' },
      // { title: 'Ethereum', icon: 'lock', unlocked: 'false' },
      // { title: 'Uniswap', icon: 'lock', unlocked: 'false' },
      { title: 'Bisq', icon: 'lock', unlocked: false }
      // { title: 'Custom Tokens', icon: 'lock', unlocked: 'false' },
      // { title: 'Blockchain Mechanics', icon: 'bitcoin', unlocked: 'false' },
      // { title: 'Tools', icon: 'hammer-wrench', unlocked: false },
      // { title: 'Heart to Heart', icon: 'account-heart', unlocked: 'false' },
      // { title: 'About Guide Wallet', icon: 'information-outline', unlocked: false }
    ]
  }),
  methods: {
    openDialog: function (section) {
      this.currentLesson = section
      this.dialog = true
    },
    cardColor (state) {
      if (state) {
        return 'blue'
      }
      return 'grey darken-3'
    },
    iconColor (state) {
      if (state) {
        return 'indigo darken-4'
      }
      return 'white'
    }
  },
  computed: {
    landingInfoPicker () {
      return this.lessonMapping[this.currentLesson]
    }
  }
}
</script>
