
import coinbaseSetup from '@/assets/lessons/tutorials/tutorials/coinbase/setup.js'
import coinbaselinkbank from '@/assets/lessons/tutorials/tutorials/coinbase/linkAccount.js'
import coinbaseDepositFiat from '@/assets/lessons/tutorials/tutorials/coinbase/depositFiat.js'
import coinbaseWithdrawBTC from '@/assets/lessons/tutorials/tutorials/coinbase/withdrawbtc.js'
const btcLandingInfo = {
  title: 'Coinbase',
  lessons: [
    { title: 'Coinbase Setup', icon: 'account-question', comp: coinbaseSetup, unlocked: true },
    { title: 'Coinbase Link Bank', icon: 'account-question', comp: coinbaselinkbank, unlocked: true },
    { title: 'Coinbase Deposit Fiat', icon: 'account-question', comp: coinbaseDepositFiat, unlocked: true },
    { title: 'Coinbase Withdraw BTC', icon: 'account-question', comp: coinbaseWithdrawBTC, unlocked: true }
  ]
}
export default btcLandingInfo
