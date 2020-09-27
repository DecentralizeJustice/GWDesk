
import intro from '@/assets/lessons/educational/lessons/btc/intro.js'
import exodusWindowsInstall from '@/assets/lessons/tutorials/tutorials/exodus/desktop/windows/install.js'
import exodusMacInstall from '@/assets/lessons/tutorials/tutorials/exodus/desktop/mac/install.js'
import coinbaseSetup from '@/assets/lessons/tutorials/tutorials/coinbase/setup.js'
import coinbaselinkbank from '@/assets/lessons/tutorials/tutorials/coinbase/linkAccount.js'
const btcLandingInfo = {
  title: 'Bitcoin',
  lessons: [
    { title: 'Intro to Bitcoin', icon: 'cake', comp: intro, unlocked: true, first: true },
    { title: 'Exodus Windows Setup', icon: 'atom-variant', comp: exodusWindowsInstall, unlocked: true },
    { title: 'Exodus Mac Setup', icon: 'account-question', comp: exodusMacInstall, unlocked: true },
    { title: 'Coinbase Setup', icon: 'account-question', comp: coinbaseSetup, unlocked: true },
    { title: 'Coinbase Link Bank', icon: 'account-question', comp: coinbaselinkbank, unlocked: true }
  ]
}
export default btcLandingInfo
