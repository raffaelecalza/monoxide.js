const AbstractProtocol = require('./abstract_protocol')

class PlaintextProtocol extends AbstractProtocol {
  constructor () {
    super((metric) => [metric.path, metric.value, this.transformTimestamp(metric.timestamp)].join(' '))
  }

  format (metrics) {
    return super.format(metrics, '\n')
  }
}

module.exports = PlaintextProtocol
