var AbstractProtocol = require('./abstract_protocol.js'),
    util = require('util')

function PlaintextProtocol () {
  AbstractProtocol.call(this, function (metric) {
    return [metric.path, metric.value, this._formatTimestamp(metric.timestamp)].join(' ');
  });
}
util.inherits(PlaintextProtocol, AbstractProtocol);

PlaintextProtocol.prototype.format = function (metrics) {
  return this.map(metrics).join("\n");
}

module.exports = PlaintextProtocol;
