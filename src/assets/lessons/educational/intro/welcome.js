import slide1 from '@/assets/courseData/slides/intro/welcome/Welcome1.jpg'
import slide2 from '@/assets/courseData/slides/intro/welcome/Welcome2.jpg'
import slide3 from '@/assets/courseData/slides/intro/welcome/Welcome3.jpg'
import slide4 from '@/assets/courseData/slides/intro/welcome/Welcome4.jpg'
import slide5 from '@/assets/courseData/slides/intro/welcome/Welcome5.jpg'
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
  nextLesson: {
    lesson: 1,
    course: 'Introduction'
  }
}
export default welcome
