
import intro from '@/assets/lessons/educational/lessons/btc/intro.js'
import exodusWindowsInstall from '@/assets/lessons/tutorials/tutorials/exodus/desktop/windows/install.js'
import exodusMacInstall from '@/assets/lessons/tutorials/tutorials/exodus/desktop/mac/install.js'
import krakenSetup from '@/assets/lessons/tutorials/tutorials/kraken/setup.js'
const btcLandingInfo = {
  title: 'Bitcoin',
  lessons: [
    { title: 'Intro to Bitcoin', icon: 'cake', comp: intro, unlocked: true, first: true },
    { title: 'Exodus Windows Setup', icon: 'atom-variant', comp: exodusWindowsInstall, unlocked: true },
    { title: 'Exodus Mac Setup', icon: 'account-question', comp: exodusMacInstall, unlocked: true },
    { title: 'Kraken Setup', icon: 'account-question', comp: krakenSetup, unlocked: true }
  ]
}
export default btcLandingInfo
