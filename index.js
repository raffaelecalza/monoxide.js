module.exports = {
  Client: {
    AbstractClient: require('./src/clients/oxide_client.js'),
    CarbonClient: require('./src/clients/carbon_client.js'),
    StatsdClient: require('./src/clients/statsd_client.js')
  },
  Metrics: {
    CarbonMetric: require('./src/metrics/metric.js'),
    Statsd: {
      AbstractMetric: require('./src/metrics/statsd/abstract_statsd_metric.js'),
      Gauge: require('./src/metrics/statsd/gauge_metric.js'),
      Counter: require('./src/metrics/statsd/counter_metric.js'),
      Timer: require('./src/metrics/statsd/timer_metric.js'),
      Histogram: require('./src/metrics/statsd/timer_metric.js'),
      Meter: require('./src/metrics/statsd/meter_metric.js')
    }
  },
  Protocol: {
    Pickle: require('./src/protocol/pickle_protocol.js'),
    Plaintext: require('./src/protocol/plaintext_protocol.js'),
  }
}
