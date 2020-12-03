import slide0 from '@/assets/lessons/tutorials/slides/wallets/setup/1.jpg'
import slide1 from '@/assets/lessons/tutorials/slides/wallets/setup/2.jpg'
import slide2 from '@/assets/lessons/tutorials/slides/wallets/setup/3.jpg'
import slide3 from '@/assets/lessons/tutorials/slides/wallets/setup/4.jpg'
import slide4 from '@/assets/lessons/tutorials/slides/wallets/setup/5.jpg'

import slide01 from '@/assets/lessons/tutorials/slides/wallets/send/1.jpg'
import slide02 from '@/assets/lessons/tutorials/slides/wallets/send/2.jpg'
import slide03 from '@/assets/lessons/tutorials/slides/wallets/send/3.jpg'
import slide04 from '@/assets/lessons/tutorials/slides/wallets/send/4.jpg'
import slide05 from '@/assets/lessons/tutorials/slides/wallets/send/5.jpg'

import slide001 from '@/assets/lessons/tutorials/slides/wallets/update/1.jpg'
import slide002 from '@/assets/lessons/tutorials/slides/wallets/update/2.jpg'
import slide003 from '@/assets/lessons/tutorials/slides/wallets/update/3.jpg'

import notes1 from '@/assets/lessons/tutorials/courseNotes/wallet/spend.html'

const backup = {
  tutorial: true,
  desktop: true,
  title: 'Testnet Wallet Setup',
  slides: [
    [
      slide0,
      slide1,
      slide2,
      slide3,
      slide4
    ],
    [
      slide01,
      slide02,
      slide03,
      slide04,
      slide05
    ],
    [
      slide001,
      slide002,
      slide003
    ]
  ],
  breakpoints: [
    [
      '0:19', '0:57', '1:13', '2:19'
    ],
    [
      '0:12', '0:29', '0:53', '1:35'
    ],
    [
      '0:19', '0:44'
    ]
  ],
  audio: [
    'audio/wallet/walletSetup.mp3',
    'audio/wallet/spendandrec.mp3',
    'audio/wallet/update.mp3'
  ],
  notes: [
    '',
    notes1,
    ''
  ]
}
export default backup
