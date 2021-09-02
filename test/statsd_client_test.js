var Oxide = require('../index.js'),
    expect = require('expect.js'),
    sinon = require('sinon'),
    helpers = require('./test_helper.js');

describe("Oxide.Client.StatsdClient", function () {
  it('doesn\'t accept protocols at construction', function () {
    expect(Oxide.Client.StatsdClient).withArgs({ protocol: new Oxide.Protocol.Pickle() }).to.throwException();
  });

  it('enqueues a counter metric when #increment is called', function () {
    var client = new Oxide.Client.StatsdClient();
    client.connect();
    client.increment('my_path');

    expect(client.queue[0]).to.be.a(Oxide.Metrics.Statsd.Counter);
    expect(client.queue[0].value).to.be(1);

    expect(client.queue[0].path).to.be('my_path');
  });

  it('enqueues a counter metric with a negative value upon a call to #decrement', function () {
    var client = new Oxide.Client.StatsdClient();
    client.connect();
    client.decrement('my_path', 3);

    expect(client.queue[0]).to.be.a(Oxide.Metrics.Statsd.Counter);
    expect(client.queue[0].value).to.be(-3);

    expect(client.queue[0].path).to.be('my_path');
  });

  it('enqueues a gauge metric with the correct value upom #gauge', function () {
    var client = new Oxide.Client.StatsdClient();
    client.connect();
    client.gauge('foo', 36);

    expect(client.queue[0]).to.be.a(Oxide.Metrics.Statsd.Gauge);
    expect(client.queue[0]).to.have.property('value', 36);

    expect(client.queue[0]).to.have.property('path', 'foo');
  });

  it('throws when #timing is called without a value', function () {
    var client = new Oxide.Client.StatsdClient();
    client.connect();

    expect(client.timing).withArgs('my_path').to.throwException();
  });

  it('enqueues a timer metric with the correct value when #timing is called', function () {
    var client = new Oxide.Client.StatsdClient();
    client.connect();
    client.timing('my_path', 500);

    expect(client.queue[0]).to.be.a(Oxide.Metrics.Statsd.Timer);
    expect(client.queue[0]).to.have.property('value', 500);

    expect(client.queue[0].path).to.be('my_path');
  });
});
