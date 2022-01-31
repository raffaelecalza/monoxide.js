class MonoxideConfig {
  constructor (host, port, interval, prefix) {
    this._host = host || '127.0.0.1'
    this._port = port || 2003
    this._interval = interval || 5000
    this._prefix = prefix || null
  }

  get host () { return this._host }
  set host (host) { this._host = host }

  get port () { return this._port }
  set port (port) { this._port = port }

  get interval () { return this._interval }
  set interval (interval) { this._interval = interval }

  get prefix () { return this._prefix }
  set prefix (prefix) { this._prefix = prefix }

  toString () {
    return `prefix=${this.prefix || '<nothing>'},host=${this.host},port=${this.port},interval=${this.interval}`
  }
}

module.exports = MonoxideConfig
