var Oxide = require('../index.js'),
    expect = require('expect.js'),
    helper = require('./test_helper.js')

describe("Oxide.Metrics.Statsd.Gauge", function () {
  it("has the metric type 'g'", function () {
    expect(new Oxide.Metrics.Statsd.Gauge()).to.have.property('type', 'g');
    expect(new Oxide.Metrics.Statsd.Gauge({}, 'k')).to.have.property('type', 'g');
  });

  it("formats itself correctly", function () {
    expect(new Oxide.Metrics.Statsd.Gauge({path: 'foo', value: 12}).format()).to.be('foo:12|g');
  });
});
