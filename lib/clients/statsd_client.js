var OxideClient = require('./oxide_client.js'),
    util = require('util'),
    _ = require('lodash'),
    dgram = require('dgram'),
    Metric = {
      Counter: require('../metrics/statsd/counter_metric.js'),
      Gauge: require('../metrics/statsd/gauge_metric.js'),
      Timer: require('../metrics/statsd/timer_metric.js')
    };

function StatsdClient (opts) {
  // Since statsd doesn't accept data in a packed format, we null out any protocol
  // given to the StatsdClient constructor
  if ((opts || {}).protocol) {
    throw 'Statsd does not accept data in a packed format, yet a protocol was provided';
  }

  OxideClient.call(this, opts);
}
util.inherits(StatsdClient, OxideClient);

StatsdClient.prototype.increment = function (path, value, sampleRate) {
  this.enqueue(new Metric.Counter({
    path: this._pathify(path),
    value: (value || 1),
    sampleRate: sampleRate
  }));
};

StatsdClient.prototype.decrement = function (path, value, sampleRate) {
  this.enqueue(new Metric.Counter({
    path: this._pathify(path),
    value: -(value || 1),
    sampleRate: sampleRate
  }));
};

StatsdClient.prototype.gauge = function (path, value) {
  this.enqueue(new Metric.Gauge({
    path: this._pathify(path),
    value: this._assertValuePresence(value)
  }));
};

StatsdClient.prototype.timing = function (path, time) {
  this.enqueue(new Metric.Timer({
    path: this._pathify(path),
    value: this._assertValuePresence(time)
  }));
};

StatsdClient.prototype.send = /* @Override */ function (protocol) {
  // Create a clone of the queue to avoid concurrency problems
  var tempQueue = this.queue.slice(0);

  // Iterate through everything in it, and one-by-one, write them to the
  // socket, since statsd doens't support packed metrics
  for (var i = 0; i < tempQueue.length; i++) {
    // Grab the current metric, format it (with #format), write it to the
    // socket.  Next!
    var metric = tempQueue[i];

    this._writeToSocket(metric.format(), function (err) {
      // Throw any errors up the stack if they arise
      if (err) throw err;
    });
  }

  this.queue = _.difference(this.queue, tempQueue);
}

StatsdClient.prototype.connect = function () {
  return this.socket = dgram.createSocket("udp4");
}

StatsdClient.prototype._writeToSocket = function (formatted, callback) {
  if (typeof this.socket === 'undefined') return;

  var buffer = new Buffer(formatted);
  this.socket.send(buffer, 0, buffer.length, this.port, this.host, callback);
}

StatsdClient.prototype._assertValuePresence = function (value) {
  if (typeof value === 'undefined') {
    throw 'cannot create this metric with the value undefined';
  } else {
    return value;
  }
}

module.exports = StatsdClient;
