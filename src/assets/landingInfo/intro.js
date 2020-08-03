import welcome from '@/assets/courseData/courses/intro/welcome.js'
import whyCrypto from '@/assets/courseData/courses/intro/whyCrypto.js'
import whichCrypto from '@/assets/courseData/courses/intro/whichCrypto.js'
import howtoStore from '@/assets/courseData/courses/intro/howtostore.js'
import howtoBuy from '@/assets/courseData/courses/intro/howtoBuy.js'

const introLandingInfo = {
  title: 'Intro To Cryptocurrency',
  lessons: [
    { title: 'Welcome to GW!', icon: 'cake', comp: welcome, unlocked: true, first: true },
    { title: 'What is Cryptocurrency?', icon: 'atom-variant', comp: whyCrypto, unlocked: true },
    { title: 'Which Crypto is Best?', icon: 'account-question', comp: whichCrypto, unlocked: true },
    { title: 'How to Store Crypto?', icon: 'calculator', comp: howtoStore, unlocked: true },
    { title: 'How To Buy Crypto?', icon: 'account-cash', comp: howtoBuy, unlocked: true }
  ]
}
export default introLandingInfo
