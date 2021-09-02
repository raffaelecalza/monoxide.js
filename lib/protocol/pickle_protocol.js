var AbstractProtocol = require('./abstract_protocol.js'),
    util = require('util')

function PickleProtocol () {
  AbstractProtocol.call(this, function (metric) {
    return "("+metric.path+", ("+this._formatTimestamp(metric.timestamp)+", "+metric.value+"))"
  });
}
util.inherits(PickleProtocol, AbstractProtocol);

PickleProtocol.prototype.format = function (metrics) {
  return "["+this.map(metrics).join(", ")+"]";
}

module.exports = PickleProtocol;
