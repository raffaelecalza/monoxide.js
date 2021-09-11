class CarbonMetric {
  constructor (path, value, timestamp) {
    this.path = path
    this.value = value
    this.timestamp = timestamp || new Date()
  }
}

module.exports = CarbonMetric
