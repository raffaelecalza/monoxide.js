const net = require('net')
const EventEmitter = require('events')
const MonoxideConfig = require('../config')
const AbstractProtocol = require('../protocols/abstract_protocol')

class AbstractClient extends EventEmitter {
  constructor (config, protocol) {
    if (!config || !protocol) { throw new Error('A config object and a protocol object must be passed to the constructor') }
    if (!(config instanceof MonoxideConfig)) { throw new Error('Config object should be an instance of MonoxideConfig') }
    if (!(protocol instanceof AbstractProtocol)) { throw new Error('Protocol object should be an instance of AbstractProtocol') }

    super()
    this.config = config
    this.protocol = protocol
    this._queue = []
    this._interval = null

    // initialize net socket and open connection
    this._initializeSocket()
  }

  start () {
    this._connect()
    this._interval = setInterval(() => {
      if (this._queue.length !== 0) {
        this._sendMetrics()
      }
    }, this.config.interval)
  }

  stop () {
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = null
      this._disconnect()
    }
  }

  _sendMetrics () {
    const sendingQueue = [...this._queue]
    const encodedMetrics = this.protocol.format(sendingQueue)

    this._socket.write(`${encodedMetrics}\r\n`, 'utf-8', (err) => {
      if (err) { this.emit('error', err) }

      this._queue = this._queue.filter(metric => !sendingQueue.includes(metric))
      this.emit('metrics-sent')
    })
  }

  _enqueue (metric) {
    this._queue.push(metric)
  }

  _pathify (path) {
    return this.config.prefix ? `${this.config.prefix}.${path}` : path
  }

  _initializeSocket () {
    this._socket = new net.Socket()
    this._socket.on('error', (err) => {
      this.emit('error', err)
    })
  }

  _connect () {
    this._socket.connect({
      host: this.config.host,
      port: this.config.port
    })
  }

  _disconnect () {
    this._socket.destroy()
  }
}

module.exports = AbstractClient
