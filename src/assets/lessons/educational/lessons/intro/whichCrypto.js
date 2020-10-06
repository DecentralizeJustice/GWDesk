import slide1 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide1.jpg'
import slide2 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide2.jpg'
import slide3 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide3.jpg'
import slide4 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide4.jpg'
import slide5 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide5.jpg'
import slide6 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide6.jpg'
import slide7 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide7.jpg'
import slide8 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide8.jpg'
import slide9 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide9.jpg'
import slide10 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide10.jpg'
import slide11 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide11.jpg'
import slide12 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide12.jpg'
import slide13 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide13.jpg'
import slide14 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide14.jpg'
import slide15 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide15.jpg'
import slide16 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide16.jpg'
import slide17 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide17.jpg'
import slide18 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide18.jpg'
import slide19 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide19.jpg'
import slide20 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide20.jpg'
import slide21 from '@/assets/lessons/educational/lessonData/slides/intro/whichCrypto/slide21.jpg'
import questions from '@/assets/lessons/educational/lessonData/eduTest/intro/introWhichCryptocurrency.js'
import notes1 from '@/assets/lessons/educational/lessonData/courseNotes/intro/whichCrypto/part1.html'
import notes2 from '@/assets/lessons/educational/lessonData/courseNotes/intro/whichCrypto/part2.html'
import thumbnail from '@/assets/lessons/educational/lessonData/thumbnails/intro/best.jpg'
const whichCrypto = {
  thumbnail,
  title: 'Which Crypto Is Best?',
  nextLesson: {
    lesson: 3,
    course: 'Introduction'
  },
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
      '0:00', '0:09', '0:32', '0:39', '1:15', '1:43', '2:21', '3:40', '4:30',
      '5:57', '7:21'
    ],
    [
      '0:00', '0:23', '2:40', '4:43', '5:29', '7:32', '8:05', '10:27', '11:28'
    ],
    [
      '0:00'
    ]
  ],
  audio: [
    'audio/intro/bestCrypto/part1Final.mp3',
    'audio/intro/bestCrypto/part2Final.mp3',
    'audio/intro/bestCrypto/congratsFinal.mp3'
  ],
  questions: questions,
  notes: [
    notes1,
    notes2
  ]
}
export default whichCrypto
