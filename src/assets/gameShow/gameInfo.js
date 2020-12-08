const introAudio = require('./files/intro.json')
const introImg = require('./files/img.json')
const info = {
  startEpochTime: '1607461312',
  crypto: 'Monero (XMR)',
  amountUSD: '20',
  numberOfQuestions: '5',
  timeToAnswerGenQuestion: '10',
  explantionTime: '10',
  waitTime: '1',
  getApi: 'http://localhost:8089/',
  intro: {
    length: '30',
    audio: introAudio,
    img: [introImg]
  },
  1: {
    question: 'What color is your bed?',
    options: ['red', 'pink', 'black', 'This is a test for long text.'],
    answer: '2',
    audio: introAudio,
    img: [introImg]
  },
  2: {
    question: 'What color is your chair?',
    options: ['red', 'pink', 'black', 'green'],
    answer: '2',
    audio: introAudio,
    img: [introImg]
  },
  3: {
    question: 'What color is your desk?',
    options: ['red', 'pink', 'blue', 'brown'],
    answer: '3',
    audio: introAudio,
    img: [introImg]
  },
  4: {
    question: 'What color is your door?',
    options: ['red', 'pink', 'brown', 'green'],
    answer: '2',
    audio: introAudio,
    img: [introImg]
  },
  5: {
    question: 'What color is your bedframe?',
    options: ['red', 'pink', 'black', 'green'],
    answer: '2',
    audio: introAudio,
    img: [introImg]
  },
  outro: {
    length: '30',
    audio: introAudio,
    img: [introImg]
  }
}
exports.default = info
