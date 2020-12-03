
import intro from '@/assets/lessons/tutorials/tutorials/wallets/setup.js'
import whyHW from '@/assets/lessons/educational/lessons/wallet/whyHW.js'
const info = {
  title: 'Wallet',
  lessons: [
    { title: 'Testnet Wallet Guide', icon: 'test-tube', comp: intro, unlocked: true, first: true },
    { title: 'Why You Need A Hardware Wallet', icon: 'lock', comp: whyHW, unlocked: true, first: false }
  ]
}
export default info
