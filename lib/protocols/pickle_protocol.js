const AbstractProtocol = require('./abstract_protocol')

class PickleProtocol extends AbstractProtocol {
  constructor () {
    super((metric) => `(${metric.path}, (${this.transformTimestamp(metric.timestamp)}, ${metric.value}))`)
  }

  format (metrics) {
    return `[${super.format(metrics, ', ')}]`
  }
}

module.exports = PickleProtocol
