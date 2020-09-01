import slide0 from '@/assets/courseData/slides/btc/intro/slide0.jpg'
import slide1 from '@/assets/courseData/slides/btc/intro/slide1.jpg'
import slide2 from '@/assets/courseData/slides/btc/intro/slide2.jpg'
import slide3 from '@/assets/courseData/slides/btc/intro/slide3.jpg'
import slide4 from '@/assets/courseData/slides/btc/intro/slide4.jpg'
import slide5 from '@/assets/courseData/slides/btc/intro/slide5.jpg'
import slide6 from '@/assets/courseData/slides/btc/intro/slide6.jpg'
import slide7 from '@/assets/courseData/slides/btc/intro/slide7.jpg'
import slide8 from '@/assets/courseData/slides/btc/intro/slide8.jpg'
import slide9 from '@/assets/courseData/slides/btc/intro/slide9.jpg'
import slide10 from '@/assets/courseData/slides/btc/intro/slide10.jpg'
import slide11 from '@/assets/courseData/slides/btc/intro/slide11.jpg'
import slide12 from '@/assets/courseData/slides/btc/intro/slide12.jpg'
import slide13 from '@/assets/courseData/slides/btc/intro/slide13.jpg'
import slide14 from '@/assets/courseData/slides/btc/intro/slide14.jpg'
import slide15 from '@/assets/courseData/slides/btc/intro/slide15.jpg'
import slide16 from '@/assets/courseData/slides/btc/intro/slide16.jpg'
import questions from '@/assets/courseData/eduTest/btc/intro.js'
import notes1 from '@/assets/courseData/courseNotes/btc/intro/part1.html'
import notes2 from '@/assets/courseData/courseNotes/btc/intro/part2.html'
const intro = {
  tutorial: true,
  title: 'Exodus Mobile Wallet Setup',
  slides: [
    [
      slide0,
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
      slide12,
      slide13,
      slide14,
      slide15,
      slide16
    ],
    [
      slide10,
      slide11,
      slide12,
      slide13,
      slide14,
      slide15
    ],
    [
      slide16
    ]
  ],
  breakpoints: [
    [
      '0:00', '0:39', '0:54', '1:02', '1:36', '3:13', '4:24', '5:39', '6:28', '6:36'
    ],
    [
      '0:00', '0:20', '1:03', '1:32', '2:43', '2:48'
    ],
    [
      '0:00'
    ]
  ],
  audio: [
    'audio/btc/intro/part1Final.mp3',
    'audio/btc/intro/part2Final.mp3',
    'audio/btc/intro/congratsFinal.mp3'
  ],
  questions: questions,
  notes: [
    notes1,
    notes2
  ]
}
export default intro
