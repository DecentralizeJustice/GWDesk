import slide0 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/0.jpg'
import slide1 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/1.jpg'
import slide2 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/2.jpg'
import slide3 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/3.jpg'
import slide4 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/4.jpg'
import slide5 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/5.jpg'
import slide6 from '@/assets/lessons/tutorials/slides/exodus/desktop/general/backup/6.jpg'
import slide01 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/1.jpg'
import slide02 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/2.jpg'
import slide03 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/3.jpg'
import slide04 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/4.jpg'
import slide05 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/5.jpg'
import slide06 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/6.jpg'
import slide07 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/7.jpg'
import slide08 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/8.jpg'
import slide09 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/9.jpg'
import slide10 from '@/assets/lessons/tutorials/slides/exodus/desktop/windows/install/10.jpg'
import notes1 from '@/assets/lessons/tutorials/courseNotes/exodus/desktop/windows/install.html'
import notes2 from '@/assets/lessons/tutorials/courseNotes/exodus/desktop/general/backup.html'
import thumbnail from '@/assets/lessons/tutorials/thumbnails/wallet.jpg'
const backup = {
  thumbnail,
  tutorial: true,
  desktop: true,
  title: 'Exodus Windows Setup',
  slides: [
    [
      slide01,
      slide02,
      slide03,
      slide04,
      slide05,
      slide06,
      slide07,
      slide08,
      slide09,
      slide10
    ],
    [
      slide0,
      slide1,
      slide2,
      slide3,
      slide4,
      slide5,
      slide6
    ]
  ],
  breakpoints: [
    [
      '0:00', '0:10', '0:51', '0:58', '1:03', '1:07', '1:16', '1:21', '1:26', '1:32'
    ],
    [
      '0:00', '0:57', '1:05', '1:21', '1:26', '1:57', '2:07'
    ]
  ],
  audio: [
    'audio/exodus/windows/install/installFinal.mp3',
    'audio/exodus/general/backup/backupFinal.mp3'
  ],
  notes: [
    notes1,
    notes2
  ]
}
export default backup
