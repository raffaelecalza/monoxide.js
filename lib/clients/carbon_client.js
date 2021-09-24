const AbstractClient = require('./abstract_client')
const PlainTextProtocol = require('../protocols').PlainTextProtocol
const CarbonMetric = require('../metrics').CarbonMetric

class CarbonClient extends AbstractClient {
  constructor (config) {
    super(config, new PlainTextProtocol())
  }

  record (path, value, timestamp) {
    const metric = new CarbonMetric(this._pathify(path), value, timestamp)

    this._enqueue(metric)
  }
}

module.exports = CarbonClient
