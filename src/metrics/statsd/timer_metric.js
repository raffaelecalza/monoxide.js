var AbstractMetric = require('./abstract_statsd_metric.js'),
    util = require('util');

function TimerMetric (opts) {
  AbstractMetric.call(this, opts, 'ms');
}
util.inherits(TimerMetric, AbstractMetric);

module.exports = TimerMetric;
