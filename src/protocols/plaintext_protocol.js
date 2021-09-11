const AbstractProtocol = require('./abstract_protocol')

class PlaintextProtocol extends AbstractProtocol {
  constructor () {
    super((metric) => [metric.path, this.transformTimestamp(metric.timestamp), metric.value].join(' '))
  }

  format (metrics) {
    return super.format(metrics, '\n')
  }
}

module.exports = PlaintextProtocol
