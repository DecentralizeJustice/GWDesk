import slide1 from '@/assets/slides/howtoStore/slide1.jpg'
import slide2 from '@/assets/slides/howtoStore/slide2.jpg'
import slide3 from '@/assets/slides/howtoStore/slide3.jpg'
import slide4 from '@/assets/slides/howtoStore/slide4.jpg'
import slide5 from '@/assets/slides/howtoStore/slide5.jpg'
import slide6 from '@/assets/slides/howtoStore/slide6.jpg'
import slide7 from '@/assets/slides/howtoStore/slide7.jpg'
import slide8 from '@/assets/slides/howtoStore/slide8.jpg'
import slide9 from '@/assets/slides/howtoStore/slide9.jpg'
import slide10 from '@/assets/slides/howtoStore/slide10.jpg'
import slide11 from '@/assets/slides/howtoStore/slide11.jpg'
import slide12 from '@/assets/slides/howtoStore/slide12.jpg'
import slide13 from '@/assets/slides/howtoStore/slide13.jpg'
import questions from '@/assets/courseData/eduTest/intro/introWhyCryptocurrency.js'
import notes1 from '@/assets/courseData/courseNotes/intro/whyCrypto/part1.html'
import notes2 from '@/assets/courseData/courseNotes/intro/whyCrypto/part2.html'
const howtoStore = {
  title: 'How to Store Crypto?',
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
      slide11,
      slide12
    ],
    [
      slide13
    ]
  ],
  breakpoints: [
    [
      0, 30, 57, 104, 144, 170, 258, 369, 489, 611, 649, 706
    ],
    [
      0
    ]
  ],
  audio: [
    'audio/howtoStore/part1Final.mp3',
    'audio/howtoStore/congratsFinal.mp3'
  ],
  questions: questions,
  notes: [
    notes1,
    notes2
  ]
}
export default howtoStore
