const Oxide = require('../index.js')
const expect = require('expect.js')
const sinon = require('sinon')
const helpers = require('./test_helper.js')

describe('Oxide.Client.CarbonClient', function () {
  it('correctly enqueues metrics in the base carbon format', function () {
    const client = new Oxide.Client.CarbonClient()

    helpers.freeze(function (now) {
      client.connect()
      client.record('foo', 20)

      const enqueued = client.queue[0]

      expect(enqueued.path).to.be('foo')
      expect(enqueued.value).to.be(20)
      expect(enqueued.timestamp).to.be(now)
    })
  })
})
