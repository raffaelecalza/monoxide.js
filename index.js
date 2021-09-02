module.exports = {
  Client: {
    AbstractClient: require('./lib/clients/oxide_client.js'),
    CarbonClient: require('./lib/clients/carbon_client.js'),
    StatsdClient: require('./lib/clients/statsd_client.js')
  },
  Metrics: {
    CarbonMetric: require('./lib/metrics/metric.js'),
    Statsd: {
      AbstractMetric: require('./lib/metrics/statsd/abstract_statsd_metric.js'),
      Gauge: require('./lib/metrics/statsd/gauge_metric.js'),
      Counter: require('./lib/metrics/statsd/counter_metric.js'),
      Timer: require('./lib/metrics/statsd/timer_metric.js'),
      Histogram: require('./lib/metrics/statsd/timer_metric.js'),
      Meter: require('./lib/metrics/statsd/meter_metric.js')
    }
  },
  Protocol: {
    Pickle: require('./lib/protocol/pickle_protocol.js'),
    Plaintext: require('./lib/protocol/plaintext_protocol.js'),
  }
}
