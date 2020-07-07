import slide1 from '@/assets/slides/whichCrypto/slide1.jpg'
import slide2 from '@/assets/slides/whichCrypto/slide2.jpg'
import slide3 from '@/assets/slides/whichCrypto/slide3.jpg'
import slide4 from '@/assets/slides/whichCrypto/slide4.jpg'
import slide5 from '@/assets/slides/whichCrypto/slide5.jpg'
import slide6 from '@/assets/slides/whichCrypto/slide6.jpg'
import slide7 from '@/assets/slides/whichCrypto/slide7.jpg'
import slide8 from '@/assets/slides/whichCrypto/slide8.jpg'
import slide9 from '@/assets/slides/whichCrypto/slide9.jpg'
import slide10 from '@/assets/slides/whichCrypto/slide10.jpg'
import slide11 from '@/assets/slides/whichCrypto/slide11.jpg'
import slide12 from '@/assets/slides/whichCrypto/slide12.jpg'
import slide13 from '@/assets/slides/whichCrypto/slide13.jpg'
import slide14 from '@/assets/slides/whichCrypto/slide14.jpg'
import slide15 from '@/assets/slides/whichCrypto/slide15.jpg'
import slide16 from '@/assets/slides/whichCrypto/slide16.jpg'
import slide17 from '@/assets/slides/whichCrypto/slide17.jpg'
import slide18 from '@/assets/slides/whichCrypto/slide18.jpg'
import slide19 from '@/assets/slides/whichCrypto/slide19.jpg'
import slide20 from '@/assets/slides/whichCrypto/slide20.jpg'
import slide21 from '@/assets/slides/whichCrypto/slide21.jpg'
import questions from '@/assets/courseData/eduTest/intro/introWhichCryptocurrency.js'
import notes1 from '@/assets/courseData/courseNotes/intro/whichCrypto/part1.html'
import notes2 from '@/assets/courseData/courseNotes/intro/whichCrypto/part2.html'
const whichCrypto = {
  title: 'Which Crypto Is Best?',
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
      slide9,
      slide10,
      slide11
    ],
    [
      slide12,
      slide13,
      slide14,
      slide15,
      slide16,
      slide17,
      slide18,
      slide19,
      slide20
    ],
    [
      slide21
    ]
  ],
  breakpoints: [
    [
      0, 9, 32, 39, 75, 103, 141, 220, 270, 357, 441
    ],
    [
      0, 23, 160, 283, 329, 452, 485, 627, 688
    ],
    [
      0
    ]
  ],
  audio: [
    'audio/bestCrypto/part1Final.mp3',
    'audio/bestCrypto/part2Final.mp3',
    'audio/bestCrypto/congratsFinal.mp3'
  ],
  questions: questions,
  notes: [
    notes1,
    notes2
  ]
}
export default whichCrypto
