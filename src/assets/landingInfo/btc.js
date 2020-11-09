
import intro from '@/assets/lessons/educational/lessons/btc/intro.js'
import smallSpend from '@/assets/lessons/tutorials/tutorials/btc/buySticker.js'
const btcLandingInfo = {
  title: 'Bitcoin',
  lessons: [
    { title: 'Intro to Bitcoin', icon: 'cake', comp: intro, unlocked: true, first: true },
    { title: 'First BTC Purchase', icon: 'cash-usd', comp: smallSpend, unlocked: true, first: false }
  ]
}
export default btcLandingInfo
