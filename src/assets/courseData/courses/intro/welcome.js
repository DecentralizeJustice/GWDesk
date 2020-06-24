import slide1 from '@/assets/slides/welcome/Welcome1.jpg'
import slide2 from '@/assets/slides/welcome/Welcome2.jpg'
import slide3 from '@/assets/slides/welcome/Welcome3.jpg'
import slide4 from '@/assets/slides/welcome/Welcome4.jpg'
import slide5 from '@/assets/slides/welcome/Welcome5.jpg'
const welcome = {
  justVideo: true,
  title: 'Welcome To Guiding Wallet',
  url: 'https://res.cloudinary.com/dylevfpbl/video/upload/v1592678087/walletVids/WelcomeFinal.mp4',
  hash: '1JXeeYelLt/6+zpl8nV0GD9yWK62K5ZMEq7Zq9J+x8Ji0gNri7tCzAFdCvOo4MrX24nN83fuVDxuMOxI6Nu5kw==',
  slides: [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  ],
  breakpoints: [
    0, 10, 41, 75, 133
  ],
  audio: [
    'audio/welcome/Welcome.mp3'
  ]
}
export default welcome
