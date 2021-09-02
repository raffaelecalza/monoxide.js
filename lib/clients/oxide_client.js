var PlaintextProtocol = require('../protocol/plaintext_protocol.js'),
    net = require('net'),
    _ = require('lodash');

function Client (opts) {
  this.queue = [];
  opts = _.defaults(_.pick(opts, Object.keys(Client.defaults)), Client.defaults);

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

Client.prototype.connect = function () {
  return this.socket = net.createConnection({
    host: this.host,
    port: this.port
  });
}

Client.prototype.start = function () {
  this.interval = setInterval((function () {
    this.send();
  }).bind(this), this.interval);
}

Client.prototype.stop = function () {
  if (this.interval) {
    this.interval.clearInterval();
  }
}

Client.prototype.enqueue = function(metric) {
  if (typeof this.socket !== 'undefined') {
    this.queue.push(metric);
  }
}

Client.prototype.send = function (protocol) {
  var tempQueue = this.queue.slice(0);
  var data = this.protocol.format(tempQueue);

  this._writeToSocket(data, function (err) {
    if (err) throw err;
    this.queue = _.difference(this.queue, tempQueue);
  }.bind(this));
}

Client.prototype._pathify = function (path) {
  if (this.prefix) {
    return this.prefix+"."+path;
  } else {
    return path;
  }
}

Client.prototype._writeToSocket = function (formatted, callback) {
  if (this.queue.length === 0) {
    return;
  } else {
    if (typeof this.socket === 'undefined') return;

    this.socket.write(formatted + "\r\n", "utf-8", callback)
  }
}

Client.defaults = {
  host: '127.0.0.1',
  port: 2003,
  prefix: undefined,
  interval: 5000,
  protocol: new PlaintextProtocol(),
}

module.exports = Client;
