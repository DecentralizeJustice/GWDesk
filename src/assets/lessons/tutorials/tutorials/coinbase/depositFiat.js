
import slide1 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/1.jpg'
import slide2 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/2.jpg'
import slide3 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/3.jpg'
import slide4 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/4.jpg'
import slide5 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/5.jpg'
import slide6 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/6.jpg'
import slide7 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/7.jpg'
import slide8 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/8.jpg'
import slide9 from '@/assets/lessons/tutorials/slides/coinbase/depositFiat/9.jpg'
import notes1 from '@/assets/lessons/tutorials/courseNotes/coinbase/setup/depositFiat.html'
import thumbnail from '@/assets/lessons/educational/lessonData/thumbnails/intro/buy.jpg'
const fiat = {
  thumbnail,
  tutorial: true,
  desktop: true,
  title: 'Coinbase Deposit Fiat',
  slides: [
    [
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6,
      slide7,
      slide8,
      slide9
    ]
  ],
  breakpoints: [
    [
      '1:06', '1:34', '1:50', '2:07',
      '2:46', '3:16', '3:34', '3:38'
    ]
  ],
  audio: [
    'audio/coinbase/setup/depositFiatFinal.mp3'
  ],
  notes: [
    notes1
  ]
}
export default fiat
