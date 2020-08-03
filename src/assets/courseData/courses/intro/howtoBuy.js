import slide1 from '@/assets/courseData/slides/intro/howtoBuy/slide1.jpg'
import slide2 from '@/assets/courseData/slides/intro/howtoBuy/slide2.jpg'
import slide3 from '@/assets/courseData/slides/intro/howtoBuy/slide3.jpg'
import slide4 from '@/assets/courseData/slides/intro/howtoBuy/slide4.jpg'
import slide5 from '@/assets/courseData/slides/intro/howtoBuy/slide5.jpg'
import slide6 from '@/assets/courseData/slides/intro/howtoBuy/slide6.jpg'
import slide7 from '@/assets/courseData/slides/intro/howtoBuy/slide7.jpg'
import slide8 from '@/assets/courseData/slides/intro/howtoBuy/slide8.jpg'
import slide9 from '@/assets/courseData/slides/intro/howtoBuy/slide9.jpg'
import slide10 from '@/assets/courseData/slides/intro/howtoBuy/slide10.jpg'
import slide11 from '@/assets/courseData/slides/intro/howtoBuy/slide11.jpg'
import slide12 from '@/assets/courseData/slides/intro/howtoBuy/slide12.jpg'
import slide13 from '@/assets/courseData/slides/intro/howtoBuy/slide13.jpg'
import slide14 from '@/assets/courseData/slides/intro/howtoBuy/slide14.jpg'
import slide15 from '@/assets/courseData/slides/intro/howtoBuy/slide15.jpg'
import slide16 from '@/assets/courseData/slides/intro/howtoBuy/slide16.jpg'
import slide17 from '@/assets/courseData/slides/intro/howtoBuy/slide17.jpg'
import slide18 from '@/assets/courseData/slides/intro/howtoBuy/slide18.jpg'
import questions from '@/assets/courseData/eduTest/intro/howtoBuy.js'
import notes1 from '@/assets/courseData/courseNotes/intro/howtoBuy/part1.html'
import notes2 from '@/assets/courseData/courseNotes/intro/howtoBuy/part2.html'
const howtoBuy = {
  title: 'How to Buy Crypto?',
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
    ],
    [
      slide10,
      slide11,
      slide12,
      slide13,
      slide14,
      slide15,
      slide16,
      slide17
    ],
    [
      slide18
    ]
  ],
  breakpoints: [
    [
      0, 35, 50, 59, 105, 208, 261, 331, 350
    ],
    [
      0, 37, 80, 123, 198, 258, 299, 331
    ],
    [
      0
    ]
  ],
  audio: [
    'audio/howtoBuy/part1Final.mp3',
    'audio/howtoBuy/part2Final.mp3',
    'audio/howtoBuy/congratsFinal.mp3'
  ],
  questions: questions,
  notes: [
    notes1,
    notes2
  ]
}
export default howtoBuy
