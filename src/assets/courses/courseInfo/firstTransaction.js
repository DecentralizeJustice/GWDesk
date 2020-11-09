import coinbaseSetup from '@/assets/lessons/tutorials/tutorials/coinbase/setup.js'
import coinbaseLinkBank from '@/assets/lessons/tutorials/tutorials/coinbase/linkAccount.js'
import coinbaseDepositFiat from '@/assets/lessons/tutorials/tutorials/coinbase/depositFiat.js'
import macExodusSetup from '@/assets/lessons/tutorials/tutorials/exodus/desktop/mac/install.js'
import coinbaseWithdrawBTC from '@/assets/lessons/tutorials/tutorials/coinbase/withdrawbtc.js'
import buyStickersWithBTC from '@/assets/lessons/tutorials/tutorials/btc/buySticker.js'

const info = {
  title: 'First Crypto Transaction',
  about: `This is a practical course that walks you through buying your
    first cryptocurrency and spending it.`,
  for: 'Students looking to to buy and spend cryptocurrency.',
  time: '~ 3 hours',
  lessons: [
    {
      title: 'Coinbase Setup',
      comp: coinbaseSetup
    },
    {
      title: 'Coinbase Link Bank Account',
      comp: coinbaseLinkBank
    },
    {
      title: 'Coinbase Deposit Fiat',
      comp: coinbaseDepositFiat
    },
    {
      title: 'Exodus Wallet Setup',
      comp: macExodusSetup
    },
    {
      title: 'Coinbase Withdraw BTC',
      comp: coinbaseWithdrawBTC
    },
    {
      title: 'Buy Stickers with BTC',
      comp: buyStickersWithBTC
    }
  ]
}
export default info
