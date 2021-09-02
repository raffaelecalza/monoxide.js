function AbstractProtocol (transformFn) {
  Object.defineProperty(this, 'transform', { value: transformFn })
}

AbstractProtocol.prototype.map = function (metrics) {
  return metrics.map(function (metric) {
    return this.transform(metric);
  }.bind(this));
}

AbstractProtocol.prototype._formatTimestamp = function (date) {
  return Math.floor(date / 1000);
}

module.exports = AbstractProtocol;
