import intro from '@/assets/courseData/courses/btc/intro.js'
import exodusIntro from '@/assets/tutorialData/exodus/setup.js'
const btcLandingInfo = {
  title: 'Bitcoin',
  lessons: [
    { title: 'Intro to Bitcoin', icon: 'cake', comp: intro, unlocked: true, first: true },
    { title: 'Exodus Wallet Setup', icon: 'atom-variant', comp: exodusIntro, unlocked: true },
    { title: 'Use Cash App', icon: 'account-question', unlocked: false }
  ]
}
export default btcLandingInfo
