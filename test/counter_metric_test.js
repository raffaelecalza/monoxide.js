var Oxide = require('../index.js'),
    expect = require('expect.js'),
    helper = require('./test_helper.js')

describe("Oxide.Metrics.Statsd.Counter", function () {
  it("has the metric type 'c'", function () {
    expect(new Oxide.Metrics.Statsd.Counter()).to.have.property('type', 'c');
    expect(new Oxide.Metrics.Statsd.Counter({}, 'k')).to.have.property('type', 'c');
  });

  it("formats itself correctly without a sample rate", function () {
    expect(new Oxide.Metrics.Statsd.Counter({path: 'foo', value: 12}).format()).to.be('foo:12|c');
  });

  it("formats itself correctly when given a sample rate", function () {
    expect(new Oxide.Metrics.Statsd.Counter({path: 'foo', value: 12, sampleRate: 0.2}).format()).to.be('foo:12|c|@0.2');
  });

  it("throws an error given an invalid sample rate", function () {
    expect(Oxide.Metrics.Statsd.Counter).withArgs({sampleRate: 3.0}).to.throwException();
  });

  it("doesn't throw an error given a valid sample rate", function () {
    expect(Oxide.Metrics.Statsd.Counter).withArgs({sampleRate: 0.5}).to.not.throwException();
  });
});
