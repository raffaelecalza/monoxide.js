var AbstractMetric = require('./abstract_statsd_metric.js'),
    util = require('util');

function GaugeMetric (opts) {
  AbstractMetric.call(this, opts, 'g');
}
util.inherits(GaugeMetric, AbstractMetric);


module.exports = GaugeMetric;
