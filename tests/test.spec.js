import testWithSpectron from 'vue-cli-plugin-electron-builder/lib/testWithSpectron'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
// eslint-disable-next-line no-undef
const spectron = require('spectron')

chai.should()
chai.use(chaiAsPromised)

describe('Application launch', function () {
  this.timeout(100000)

  beforeEach(function () {
    return testWithSpectron(spectron).then(instance => {
      this.app = instance.app
      this.stopServe = instance.stopServe
    })
  })

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.stopServe()
    }
  })
  after(function () {
    // eslint-disable-next-line no-undef
  })

  it('opens a window', function (done) {
    return this.app.client
      .getWindowCount()
      .should.eventually.have.at.least(1)
      .notify(done)
  })
})
