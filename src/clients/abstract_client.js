var PlaintextProtocol = require('../protocols/plaintext_protocol.js'),
    net = require('net'),
    _ = require('lodash');

Client.prototype.send = function (protocol) {
  var tempQueue = this.queue.slice(0);
  var data = this.protocol.format(tempQueue);

  this._writeToSocket(data, function (err) {
    if (err) throw err;
    this.queue = _.difference(this.queue, tempQueue);
  }.bind(this));
}

Client.prototype._writeToSocket = function (formatted, callback) {
  if (this.queue.length === 0) {
    return;
  } else {
    if (typeof this.socket === 'undefined') return;

    this.socket.write(formatted + "\r\n", "utf-8", callback)
  }
}

const net = require('net');

class AbstractClient {
  // Private properties
  #queue = [];
  #socket;
  #interval;
  config;
  protocol;

  constructor(config, protocol) {
    this.prefix = prefix;
    this.net_config = config;
    this.protocol = protocol;
    this.#initializeSocket();
  }

  start() {
    this.#interval = setInterval((() => {
      if(this.#queue.length != 0)
        this.#sendMetrics();
    }).bind(this), this.interval);
  }

  stop() {
    if(this.#interval) {
      this.#interval.clearInterval();
    }
  }

  #enqueue(metric) {
    this.#queue.push(metric);
  }

  #pathify(path) {
    return this.config.prefix ? `${this.config.prefix}.${path}` : path;
  }

  #initializeSocket() {
    this.#socket = new net.Socket();
  }

  #connect(cb) {
    this.#socket.connect({
      host: this.config.host,
      port: this.config.port
    }, cb);
  }

  #disconnect() {
    this.#socket.destroy();
  }
}

module.exports = AbstractClient;