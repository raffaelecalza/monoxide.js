var Oxide = require('../index.js'),
    expect = require('expect.js'),
    sinon = require('sinon');

describe("Oxide.Client.AbstractClient", function () {
  it('obeys given arguments', function () {
    var client = new Oxide.Client.AbstractClient({host: 'foo', port: 'bar'});

    expect(client).to.have.property('host', 'foo');
    expect(client).to.have.property('port', 'bar');
  });

  it('set values to their defaults when no arguemnts are provided', function () {
    var client = new Oxide.Client.AbstractClient({host: 'foo'});
    expect(client).to.have.property('port', Oxide.Client.AbstractClient.defaults.port);
  });

  it('discards values that aren\'t in the default values', function () {
    var client = new Oxide.Client.AbstractClient({ randomProperty: 'randomValue' });

    expect(client).to.not.have.property('randomProperty');
  });

  it('returns a socket with #connect', function () {
    var client = new Oxide.Client.AbstractClient();
    expect(client.connect()).to.not.be(null);
  });

  it('only stores items in its queue if connected', function () {
    var client = new Oxide.Client.AbstractClient();
    var metric = new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'});

    // It doesn't store items that are pushed while not connected
    client.enqueue(metric);
    expect(client.queue).to.be.empty();

    // It does store items that are pushed while the client is connected
    client.connect();
    client.enqueue(metric);

    expect(client.queue).to.contain(metric);
  });

  it('calls #send at an interval', function (done) {
    var client = new Oxide.Client.AbstractClient({interval: 1});
    sinon.spy(client, 'send');

    client.start();
    setTimeout(function () {
      expect(client.send).to.have.property('called', true);
      done();
    }, client.interval);
  });

  describe("#send", function () {
    before(function () {
      // Before this group of tests start, stub the _writeToSocket method
      // to just call the callback
      sinon.stub(Oxide.Client.AbstractClient.prototype, "_writeToSocket").callsArg(1);
    });

    after(function () {
      // Once we're done, restore the original behavior of the method
      Oxide.Client.AbstractClient.prototype._writeToSocket.restore();
    });

    var pickle = Oxide.Protocol.Pickle();

    var m1 = new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'});
    var m2 = new Oxide.Metrics.CarbonMetric({path: 'foo', value: 'bar'});

    it('removes items from the queue upon sending', function () {
      var client = new Oxide.Client.AbstractClient();

      client.connect();
      client.enqueue(m1);
      client.send(pickle);

      expect(client.queue).to.be.empty();
    });

    it('only removes items in the queue before calling #send', function () {
      var client = new Oxide.Client.AbstractClient();

      client.connect();
      client.enqueue(m1);
      client.send(pickle);
      client.enqueue(m2);

      expect(client.queue).to.not.contain(m1);
      expect(client.queue).to.contain(m2);
    });
  });
});
