import welcomeComp from '@/assets/lessons/educational/lessons/intro/welcome.js'
import whyCrytpo from '@/assets/lessons/educational/lessons/intro/whyCrypto.js'
import whichCrypto from '@/assets/lessons/educational/lessons/intro/whichCrypto.js'
import store from '@/assets/lessons/educational/lessons/intro/howtostore.js'
import buy from '@/assets/lessons/educational/lessons/intro/howtoBuy.js'
const welcome = {
  title: 'Crypto Fundamentals',
  about: `This lesson is a detailed introduction to Cryptocurrency
  ranging from what cryptocurrency to which to pick.`,
  for: `Students who want to form a solid foundation for future crypto usage
  and learning.`,
  time: '~ 2 hours',
  lessons: [
    {
      title: 'Welcome To Guiding Wallet',
      comp: welcomeComp
    },
    {
      title: 'Why Crypto is Amazing',
      comp: whyCrytpo
    },
    {
      title: 'Which Crypto is the Best?',
      comp: whichCrypto
    },
    {
      title: 'How To Store Crypto',
      comp: store
    },
    {
      title: 'How To Buy Crypto',
      comp: buy
    }
  ]
}
export default welcome
