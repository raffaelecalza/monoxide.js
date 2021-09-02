var _ = require('lodash');

function AbstractStatsdMetric (opts, type) {
  opts = _.pick(opts, ['path', 'value']);
  opts.type = type;

  if (opts.type.length > 2) {
    throw 'Invalid property type!';
  }

  for (var key in opts) {
    Object.defineProperty(this, key, { value: opts[key] })
  }
}

AbstractStatsdMetric.prototype.format = function () {
  return this.path+":"+this.value+"|"+this.type;
};

module.exports = AbstractStatsdMetric;
