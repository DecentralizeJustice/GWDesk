<template>
    <v-col
      cols="10"
    >
    <v-card class="" >
      <v-card-title class="headline justify-center">
      Crypto Trivia Show
      </v-card-title>
      <v-divider></v-divider>
      <v-row no-gutters align-content='center' justify='space-around' class="pa-5">
        <v-col
          cols="4"
        >
        <v-card class="" color='grey darken-3'>
          <v-card-title class="headline justify-center">
            General Info
          </v-card-title>
          <v-divider/>
          <v-col  cols='12'>
          <v-card-text style="">
            <div class="" style="font-size: large;">
              Winning Pot Amount: {{amountUSD}} USD
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-cash-usd
                 </v-icon>
               </v-col>
             </v-row>
            </div>
            <div class="mt-2" style="font-size: large;">
              Next Gameshow: {{regularTime}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-av-timer
                 </v-icon>
               </v-col>
             </v-row>
            </div>
            <div class="mt-2" style="font-size: large;">
              Trivia Subject: {{subject}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                   mdi-library-books
                 </v-icon>
               </v-col>
             </v-row>
            </div>
            <div class="mt-2" style="font-size: large;">
              Payment Crypto: {{crypto}}
              <v-row no-gutters justify-content='center' >
               <v-col cols='2' offset='5' class="justify-center text-center">
                 <v-icon x-large color="blue lighten-1">
                  mdi-account-cash
                 </v-icon>
               </v-col>
             </v-row>
            </div>
            <v-row
              align="center"
              justify="center"
            >
              <v-btn
              @click.stop='showInfo'
                color="orange accent-4"
                class="mt-4"
              >
                Show More Info
              </v-btn>
            </v-row>
          </v-card-text>
          </v-col>
        </v-card>
        </v-col>
        <v-col
          cols="6"
        >
        <v-card class="" color='grey darken-2'>
          <v-card-title class="headline justify-center">
            Your Info
          </v-card-title>
          <v-divider/>
          <v-col  cols='12'>
              <v-row justify="space-around" align="center">
                <v-col cols='5'>
              <div class="text-center text-h6" >
                Monero Address:
                <div v-if='!settingAddress' class="text-left mt-1 text-body-1"
                >
                  {{displayAddress}}
                </div>
                <v-row v-if='settingAddress'>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="addressValue"
                      label="Monero Address"
                      color="black"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn
                  v-if='!settingAddress && addressValue.length ===0'
                  @click='setAddress'
                    color="warning"
                    class="ma-2"
                  >
                    Set Address
                  </v-btn>
                  <v-btn
                  v-if='!settingAddress && addressValue.length !==0'
                  @click='setAddress'
                    color="red"
                    class="ma-2"
                  >
                    Edit Address
                  </v-btn>
                  <v-btn
                  v-if='settingAddress'
                  @click='confirmAddress(addressValue)'
                    color="green"
                    class=""
                  >
                    Confirm Address
                  </v-btn>
                </v-row>
              </div>
            </v-col>
            <v-col cols='6' class="text-center text-h6">
              Display Name:
              <div class="text-center mt-3 text-h5">
                {{userIdInfo.adjective}}
              </div>
              <div class="text-center mt-3 text-h2">
                {{userIdInfo.emoji}}
              </div>
              <v-row
                align="center"
                justify="center"
              >
                <v-btn
                @click='generateNewname'
                  color="primary"
                  class="mt-4"
                >
                  Generate New Name
                </v-btn>
              </v-row>
            </v-col>
              </v-row>
              <div class="mt-2" style="font-size: large;">
                <v-row no-gutters justify='center' >
                 <v-col cols='8'  class="justify-center text-center" v-if='allInfoSet'>
                   <v-alert
                      type="success"
                      border="left"
                      class="text-center"
                    >
                      Your All Set!!
                    </v-alert>
                 </v-col>
                 <v-col cols='12'  class="" v-if='!allInfoSet'>
                   <v-alert
                      dense
                      border="left"
                      type="warning"
                    >
                      <div class="text-center text-h6">You need to enter your address</div>
                    </v-alert>
                   <!-- <v-progress-linear color='green' :value="progress"></v-progress-linear> -->
                 </v-col>
               </v-row>
              </div>
          </v-col>
        </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters align-content='center' class="text-center" v-if='!ready' align="center"
        justify="space-around" >
        <v-col
          cols="5"
          align-content='center'
          align='center'
        >
        <div>
          <v-alert
            prominent
            color="#2A3B4D"
            icon="mdi-av-timer"
          >
          <v-row no-gutters align-content='center' justify='space-around' class="">
            <v-col
              cols="3"
            >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.days}} <br> Days
          </div>
        </v-col>
        <v-col
          cols="3"
        >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.hours}} <br> Hours
          </div>
        </v-col>
        <v-col
          cols="3"
        >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.minutes}} <br> Minutes
          </div>
        </v-col>
        <v-col
          cols="3"
        >
          <div class="mt-2" style="font-size: large;">
            {{tillShowTime.seconds}} <br> Seconds
          </div>
        </v-col>
        </v-row>
          </v-alert>
        </div>
        </v-col>
        <v-col
          cols="4"
          align-content='center'
          align='center'
        >
        <div>
          <v-alert
            prominent
            type="warning"
          >
            <v-row align="center">
              <v-col class="text-left">
                Get Here Early, we start right on time.
              </v-col>
            </v-row>
          </v-alert>
        </div>
        </v-col>
      </v-row>
      <v-row
        align="center"
        justify="center"
        v-if='ready && !showOver'
      >
        <v-btn
          @click.stop='start'
          color="primary"
          class="mb-5"
        >
          Start!!!
        </v-btn>
      </v-row>
      <v-divider/>
      <v-card-actions>
      <v-btn
      @click.stop='showInfo'
        color="orange"
        text
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-card-actions>
    </v-card>
    </v-col>
</template>

<script>
import { get } from '@/assets/util/axios.js'
import adjectiveList from '@/assets/gameShow/adjective.json'
import emojiObject from '@/assets/gameShow/emoji.json'
export default {
  name: 'home',
  props: ['userIdInfo', 'dev', 'genInfo'],
  components: {
  },
  data: () => ({
    difference: 3000000,
    settingAddress: false,
    addressValue: ''
    // lessons: [
    //   {
    //     title: 'Why You Need A Hardware Wallet',
    //     icon: 'deskphone',
    //     routeInfo: { name: 'lessons', params: { lessonCategory: 'Wallet', lesson: 1 } }
    //   }
    // ]
  }),
  computed: {
    subject: function () {
      return this.genInfo.subject
    },
    amountUSD: function () {
      return this.genInfo.amountUSD
    },
    crypto: function () {
      return this.genInfo.crypto
    },
    introLength: function () {
      return parseInt(this.genInfo.intro.length) * 1000
    },
    outroLength: function () {
      return parseInt(this.genInfo.outro.length) * 1000
    },
    allQuestionsLength: function () {
      return (parseInt(this.genInfo.timeToAnswerGenQuestion) +
       parseInt(this.genInfo.explantionTime)) *
        1000 *
        parseInt(this.genInfo.numberOfQuestions)
    },
    showOver: function functionName () {
      if (this.currentTime > (this.startTime + this.introLength + this.allQuestionsLength + this.outroLength)) {
        return true
      }
      return false
    },
    startTime: function () {
      return parseInt(this.genInfo.startEpochTime) * 1000
    },
    displayAddress: function () {
      if (this.userIdInfo.address === '') {
        return 'None Yet'
      } else {
        return this.userIdInfo.address
      }
    },
    progress: function () {
      // const addressReady = this.userIdInfo.address !== ''
      // const userInfoReady = (this.userIdInfo.adjective !== '' && this.userIdInfo.emoji !== '')
      // if (!addressReady && !userInfoReady) {
      //   return 0
      // }
      return 50
    },
    allInfoSet: function () {
      const infoReady =
      (this.userIdInfo.adjective !== '' && this.userIdInfo.emoji !== '' && this.userIdInfo.address !== '')
      if (infoReady) {
        return true
      }
      return false
    },
    tillShowTime: function () {
      const distance = this.difference
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      return {
        days, hours, minutes, seconds
      }
    },
    ready: function () {
      const timeReady = (this.difference < 0)
      const infoReady = this.allInfoSet
      if ((timeReady && infoReady) || this.dev) {
        return true
      } else {
        return false
      }
    },
    regularTime: function () {
      const d = new Date(this.startTime)
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const month = months[d.getMonth()]
      const day = d.getDate()
      let hour = d.getHours()
      const ampm = hour >= 12 ? 'p.m.' : 'a.m.'
      hour = hour % 12
      if (hour === 0) {
        hour = 12
      }
      let minutes = d.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return hour + ':' + minutes + ' ' + ampm + ' ' + day + ', ' + month
    }
  },
  methods: {
    showInfo () {
      this.$emit('showRules')
    },
    setAddress () {
      this.settingAddress = true
    },
    confirmAddress (address) {
      this.settingAddress = false
      const cleanAddress = address.replace(/\s+/g, '')
      this.$emit('updateAddress', cleanAddress)
    },
    start () {
      this.$emit('readyToStart')
    },
    countDownTimer () {
      if (this.difference > 0) {
        setTimeout(() => {
          const current = Date.now()
          this.difference = this.startTime - current
          this.countDownTimer()
        }, 1000)
      }
    },
    goToRoute: function (routeInfo) {
      this.$router.push(routeInfo)
    },
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    generateNewname: function () {
      const adjlistLength = adjectiveList.length
      const adjective = adjectiveList[this.getRandomIntInclusive(0, adjlistLength - 1)]
      const adjectiveCap = adjective.charAt(0).toUpperCase() + adjective.slice(1)
      const emojiList = Object.values(emojiObject)
      const emojiListLength = emojiList.length
      const emoji = emojiList[this.getRandomIntInclusive(0, emojiListLength - 1)]
      this.$emit('updateUserIDInfo', { adjective: adjectiveCap, emoji })
    },
    setupInfo: function () {
      this.addressValue = this.userIdInfo.address
      if (this.userIdInfo.adjective === '' || this.userIdInfo.emoji === '') {
        this.generateNewname()
      }
    },
    getPassword: async function () {
      const sendTime = Date.now()
      const url = this.genInfo.getApi
      const result = await get(url)
      const serverTime = result.data.time
      console.log('lag:', serverTime - sendTime, ' ms')
    }
  },
  watch: {
    userIdInfo: {
      deep: true,
      handler: function () {
        this.addressValue = this.userIdInfo.address
      }
    }
  },
  async beforeMount () {
    await this.setupInfo()
  },
  async mounted () {
    this.getPassword()
    this.countDownTimer()
  },
  beforeDestroy () {
  }
}
</script>
