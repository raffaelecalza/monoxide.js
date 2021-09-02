var AbstractMetric = require('./abstract_statsd_metric.js'),
    util = require('util');

function CounterMetric (opts) {
  this.sampleRate = (opts || {}).sampleRate;
  if (this.sampleRate && (this.sampleRate < 0.0 || this.sampleRate > 1.0)) {
    throw "Sample rates must be between 0 and 1! (given: "+this.sampleRate+")";
  }

  AbstractMetric.call(this, opts, 'c');
}
util.inherits(CounterMetric, AbstractMetric);

CounterMetric.prototype.format = function () {
  var formatted = CounterMetric.super_.prototype.format.apply(this);
  if (typeof this.sampleRate !== 'undefined') {
    formatted += "|@" + this.sampleRate;
  }

  return formatted;
};

module.exports = CounterMetric;
