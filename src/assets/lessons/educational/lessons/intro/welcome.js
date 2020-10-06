import slide1 from '@/assets/lessons/educational/lessonData/slides/intro/welcome/Welcome1.jpg'
import slide2 from '@/assets/lessons/educational/lessonData/slides/intro/welcome/Welcome2.jpg'
import slide3 from '@/assets/lessons/educational/lessonData/slides/intro/welcome/Welcome3.jpg'
import slide4 from '@/assets/lessons/educational/lessonData/slides/intro/welcome/Welcome4.jpg'
import slide5 from '@/assets/lessons/educational/lessonData/slides/intro/welcome/Welcome5.jpg'
import thumbnail1 from '@/assets/lessons/educational/lessonData/thumbnails/intro/welcome.jpg'
const welcome = {
  justVideo: true,
  title: 'Welcome To Guiding Wallet',
  slides: [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  ],
  breakpoints: [
    '0:00', '0:10', '0:41', '1:15', '2:13'
  ],
  audio: 'audio/intro/welcome/Welcome.mp3',
  thumbnail: thumbnail1,
  nextLesson: {
    lesson: 1,
    course: 'Introduction'
  }
}
export default welcome
