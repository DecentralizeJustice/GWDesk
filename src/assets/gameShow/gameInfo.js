// import intro from '@/assets/lessons/educational/lessons/btc/intro.js'
// import smallSpend from '@/assets/lessons/tutorials/tutorials/btc/buySticker.js'
import introAudio from '@/assets/gameShow/files/intro.json'
import introImg from '@/assets/gameShow/files/img.json'
const info = {
  startEpochTime: '1607315244',
  crypto: 'Monero (XMR)',
  amountUSD: '20',
  numberOfQuestions: '5',
  timeToAnswerGenQuestion: '10',
  explantionTime: '10',
  intro: {
    length: '30',
    audio: introAudio[0],
    img: [introImg[0]]
  },
  1: {
    question: 'What color is your bed?',
    options: ['red', 'pink', 'black', 'This is a test for long text.'],
    answer: '2'
  },
  2: {
    question: 'What color is your chair?',
    options: ['red', 'pink', 'black', 'green'],
    answer: '2'
  },
  3: {
    question: 'What color is your desk?',
    options: ['red', 'pink', 'blue', 'brown'],
    answer: '3'
  },
  4: {
    question: 'What color is your door?',
    options: ['red', 'pink', 'brown', 'green'],
    answer: '2'
  },
  5: {
    question: 'What color is your bedframe?',
    options: ['red', 'pink', 'black', 'green'],
    answer: '2'
  },
  outro: {
    length: '50'
  }
}
export default info
