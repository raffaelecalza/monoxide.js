var Oxide = require('../index.js'),
    expect = require('expect.js'),
    sinon = require('sinon'),
    helpers = require('./test_helper.js');

describe("Oxide.Client.CarbonClient", function () {
  it('correctly enqueues metrics in the base carbon format', function () {
    var client = new Oxide.Client.CarbonClient();

    helpers.freeze(function (now) {
      client.connect();
      client.record('foo', 20)

      var enqueued = client.queue[0];

      expect(enqueued.path).to.be('foo');
      expect(enqueued.value).to.be(20);
      expect(enqueued.timestamp).to.be(now);
    });
  });
});
