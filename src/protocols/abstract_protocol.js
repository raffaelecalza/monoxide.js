class AbstractProtocol {
  constructor (transformFunction) {
    if (!transformFunction) { throw new Error('Tranform function cannot be null, it must have a value to work') }

    this._transformFunction = transformFunction
  }

  transformTimestamp (timestamp) {
    return Math.floor(timestamp / 1000)
  }

  format (metrics, joinSequence) {
    return metrics.map(this._transformFunction).join(joinSequence)
  }
}

module.exports = AbstractProtocol
