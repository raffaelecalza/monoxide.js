var Oxide = require('../index.js'),
    helpers = require('./test_helper.js'),
    expect = require('expect.js');

describe("Oxide.Protocol.Plaintext", function () {
  var plaintext = new Oxide.Protocol.Plaintext();
  var metrics = [
                  new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'}),
                  new Oxide.Metrics.CarbonMetric({path: 'baz', value: 'donk'})
                ];

  it('exists', function () {
    expect(Oxide.Protocol.Plaintext).to.be.a('function');
  });

  it('correctly transforms a single metric', function () {
    helpers.freeze(function (now) {
      var metric = new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'});
      var formattedDate = now / 1000 | 0;

      expect(plaintext.transform(metric)).to.eql('foo bar '+formattedDate)
    });
  });

  it('maps an array of metrics in their correct form', function () {
    helpers.freeze(function (now) {
      var formattedDate = Math.floor(now / 1000);
      var mappedMetrics = ['foo bar '+formattedDate, 'baz donk '+formattedDate];

      expect(plaintext.map(metrics)).to.eql(mappedMetrics)
    });

  });

  it('formats an array of metrics according to protocol', function () {
    helpers.freeze(function (now) {
      var formattedDate = Math.floor(now / 1000);
      var formattedMetrics = 'foo bar '+formattedDate+'\nbaz donk '+formattedDate;

      expect(plaintext.format(metrics)).to.be(formattedMetrics);
    });
  });
});
