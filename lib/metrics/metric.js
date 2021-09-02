var _ = require('lodash')

var defaults = function () {
  return { timestamp: new Date() }
}

function CarbonMetric (opts) {
  opts = _.defaults(_.pick(opts, ['path', 'value', 'timestamp']), defaults());

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

module.exports = CarbonMetric;
