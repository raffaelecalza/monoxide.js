var Oxide = require('../index.js'),
    helpers = require('./test_helper.js'),
    expect = require('expect.js');

describe("Oxide.Protocol.Pickle", function () {
  var pickle = new Oxide.Protocol.Pickle();
  var metrics = [
                  new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'}),
                  new Oxide.Metrics.CarbonMetric({path: 'baz', value: 'donk'})
                ];

  it('exists', function () {
    expect(Oxide.Protocol.Pickle).to.be.a('function');
  });

  it('correctly transforms a single metric', function () {
    helpers.freeze(function (now) {
      var metric = new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'});
      var formattedDate = now / 1000 | 0;

      expect(pickle.transform(metric)).to.eql('(foo, ('+formattedDate+', bar))')
    });
  });

  it('maps an array of metrics in their correct form', function () {
    helpers.freeze(function (now) {
      var formattedDate = Math.floor(now / 1000);
      var mappedMetrics = ['(foo, ('+formattedDate+', bar))', '(baz, ('+formattedDate+', donk))'];

      expect(pickle.map(metrics)).to.eql(mappedMetrics)
    });

  });

  it('formats an array of metrics according to protocol', function () {
    helpers.freeze(function (now) {
      var formattedDate = Math.floor(now / 1000);
      var formattedMetrics = '[(foo, ('+formattedDate+', bar)), (baz, ('+formattedDate+', donk))]';

      expect(pickle.format(metrics)).to.be(formattedMetrics);
    });
  });
});
