import welcomeComp from '@/assets/lessons/educational/lessons/intro/welcome.js'
import whyCrytpo from '@/assets/lessons/educational/lessons/intro/whyCrypto.js'
const welcome = {
  title: 'Full Introduction to Crypto',
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
    }
  ]
}
export default welcome
