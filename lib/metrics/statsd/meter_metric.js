var AbstractMetric = require('./abstract_statsd_metric.js'),
    util = require('util');

function MeterMetric (opts) {
  AbstractMetric.call(this, opts, 'm');
}
util.inherits(MeterMetric, AbstractMetric);

module.exports = MeterMetric;
