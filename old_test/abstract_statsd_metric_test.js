const Oxide = require('../index.js')
const expect = require('expect.js')

describe('Oxide.Metrics.Statsd.AbstractMetric', function () {
  it('sets allowed values', function () {
    const metric = new Oxide.Metrics.Statsd.AbstractMetric({
      path: 'foo',
      value: 12
    }, 'm')

    expect(metric).to.have.property('path', 'foo')
    expect(metric).to.have.property('value', 12)
    expect(metric).to.have.property('type', 'm')
  })

  it('discards values that aren\'t allowed', function () {
    const metric = new Oxide.Metrics.Statsd.AbstractMetric({
      path: 'foo',
      value: 12
    }, 'm')

    expect(metric).to.not.have.property('unknown_property')
  })

  it('throws an error for metric types longer than one character', function () {
    expect(Oxide.Metrics.Statsd.AbstractMetric).withArgs({}, 'long_metric').to.throwException()
  })
})
