var util = require('util'),
    OxideClient = require('./oxide_client.js'),
    Metric = require('../metrics/metric.js');

function CarbonClient (opts) {
  OxideClient.call(this, opts);
}
util.inherits(CarbonClient, OxideClient);

CarbonClient.prototype.record = function (path, value, timestamp) {
  var opts = { path: this._pathify(path), value: value }
  if (typeof timestamp !== 'undefined') {
    opts.timestamp = timestamp
  }

  return this.enqueue(new Metric(opts));
}

module.exports = CarbonClient;
