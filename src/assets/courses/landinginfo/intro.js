import welcome from '@/assets/courses/courseInfo/welcome.js'
import firstTrans from '@/assets/courses/courseInfo/firstTransaction.js'

const introLandingInfo = {
  title: 'Beginner To Crypto',
  lessons: [
    { title: 'Crypto Fundamentals', icon: 'cake', comp: welcome, unlocked: true, first: true },
    { title: 'First Crypto Transactions', icon: 'cake', comp: firstTrans, unlocked: true, first: false }
  ]
}
export default introLandingInfo
