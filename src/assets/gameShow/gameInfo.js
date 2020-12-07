import introAudio from '@/assets/gameShow/files/intro.json'
import introImg from '@/assets/gameShow/files/img.json'
const info = {
  startEpochTime: '1607322827',
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
    answer: '2',
    audio: introAudio[0],
    img: [introImg[0]]
  },
  2: {
    question: 'What color is your chair?',
    options: ['red', 'pink', 'black', 'green'],
    answer: '2',
    audio: introAudio[0],
    img: [introImg[0]]
  },
  3: {
    question: 'What color is your desk?',
    options: ['red', 'pink', 'blue', 'brown'],
    answer: '3',
    audio: introAudio[0],
    img: [introImg[0]]
  },
  4: {
    question: 'What color is your door?',
    options: ['red', 'pink', 'brown', 'green'],
    answer: '2',
    audio: introAudio[0],
    img: [introImg[0]]
  },
  5: {
    question: 'What color is your bedframe?',
    options: ['red', 'pink', 'black', 'green'],
    answer: '2',
    audio: introAudio[0],
    img: [introImg[0]]
  },
  outro: {
    length: '30',
    audio: introAudio[0],
    img: [introImg[0]]
  }
}
export default info
