var Oxide = require('../index.js'),
    expect = require('expect.js'),
    helper = require('./test_helper.js')

describe("Oxide.Metrics.Statsd.Meter", function () {
  it("has the metric type 'm'", function () {
    expect(new Oxide.Metrics.Statsd.Meter()).to.have.property('type', 'm');
    expect(new Oxide.Metrics.Statsd.Meter({}, 'k')).to.have.property('type', 'm');
  });

  it("formats itself correctly", function () {
    expect(new Oxide.Metrics.Statsd.Meter({path: 'users_online', value: 127}).format()).to.be('users_online:127|m');
  });
});
