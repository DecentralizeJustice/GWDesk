import slide1 from '@/assets/courseData/slides/intro/howtoStore/slide1.jpg'
import slide2 from '@/assets/courseData/slides/intro/howtoStore/slide2.jpg'
import slide3 from '@/assets/courseData/slides/intro/howtoStore/slide3.jpg'
import slide4 from '@/assets/courseData/slides/intro/howtoStore/slide4.jpg'
import slide5 from '@/assets/courseData/slides/intro/howtoStore/slide5.jpg'
import slide6 from '@/assets/courseData/slides/intro/howtoStore/slide6.jpg'
import slide7 from '@/assets/courseData/slides/intro/howtoStore/slide7.jpg'
import slide8 from '@/assets/courseData/slides/intro/howtoStore/slide8.jpg'
import slide9 from '@/assets/courseData/slides/intro/howtoStore/slide9.jpg'
import slide10 from '@/assets/courseData/slides/intro/howtoStore/slide10.jpg'
import slide11 from '@/assets/courseData/slides/intro/howtoStore/slide11.jpg'
import slide12 from '@/assets/courseData/slides/intro/howtoStore/slide12.jpg'
import slide13 from '@/assets/courseData/slides/intro/howtoStore/slide13.jpg'
import questions from '@/assets/courseData/eduTest/intro/howtostore.js'
import notes1 from '@/assets/courseData/courseNotes/intro/howtoStore.html'
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
      '0:00', '0:30', '0:57', '1:44', '2:24', '2:50', '4:18', '6:09', '8:09',
      '10:11', '10:49', '11:46'
    ],
    [
      '0:00'
    ]
  ],
  audio: [
    'audio/intro/howtoStore/part1Final.mp3',
    'audio/intro/howtoStore/congratsFinal.mp3'
  ],
  questions: questions,
  notes: [
    notes1
  ]
}
export default howtoStore
