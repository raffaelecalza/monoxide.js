const Oxide = require('../index.js')
const helpers = require('./test_helper.js')
const expect = require('expect.js')

describe('Oxide.Protocol.Plaintext', function () {
  const plaintext = new Oxide.Protocol.Plaintext()
  const metrics = [
    new Oxide.Metrics.CarbonMetric({ path: 'foo', value: 'bar' }),
    new Oxide.Metrics.CarbonMetric({ path: 'baz', value: 'donk' })
  ]

  it('exists', function () {
    expect(Oxide.Protocol.Plaintext).to.be.a('function')
  })

  it('correctly transforms a single metric', function () {
    helpers.freeze(function (now) {
      const metric = new Oxide.Metrics.CarbonMetric({ path: 'foo', value: 'bar' })
      const formattedDate = now / 1000 | 0

      expect(plaintext.transform(metric)).to.eql('foo bar ' + formattedDate)
    })
  })

  it('maps an array of metrics in their correct form', function () {
    helpers.freeze(function (now) {
      const formattedDate = Math.floor(now / 1000)
      const mappedMetrics = ['foo bar ' + formattedDate, 'baz donk ' + formattedDate]

      expect(plaintext.map(metrics)).to.eql(mappedMetrics)
    })
  })

  it('formats an array of metrics according to protocol', function () {
    helpers.freeze(function (now) {
      const formattedDate = Math.floor(now / 1000)
      const formattedMetrics = 'foo bar ' + formattedDate + '\nbaz donk ' + formattedDate

      expect(plaintext.format(metrics)).to.be(formattedMetrics)
    })
  })
})
