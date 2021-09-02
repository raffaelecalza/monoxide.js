# monoxide.js - Work in progress

## Original description from oxide.js:
Oxide is a Node.js client designed for easy communicating with [Carbon](https://github.com/graphite-project/carbon), a data injest tool which is a part of the Graphite project.  Oxide also works well with [Statsd](https://github.com/etsy/statsd), a fantastic little tool from the folks at Etsy designed for more powerful metrics recording.

## Installation

oxide.js is a npm package, so installation couldn't be easier.  To install oxide.js as a dependency, simply execute:

```shell
$ npm install oxide.js --save
```

And then require oxide in your project:

```js
var Oxide = require('oxide.js');
```

## Theory of Operation

`oxide.js` is a pretty simple tool.  It aggregates metrics using the `#record` method, and then compacts them using either one of two protocols, the [pickle protocol](http://graphite.readthedocs.org/en/latest/feeding-carbon.html#the-pickle-protocol) or the [plaintext protocol](http://graphite.readthedocs.org/en/latest/feeding-carbon.html#the-plaintext-protocol).  On a given interval (see the [usage](#usage) section), the protocol will compact all of the `Metric`s in the client's queue, send them over the socket, and dump the queue.

When using `Oxide.js` in Statsd mode, it will aggregate the stats using the same queueing method as in carbon mode, however, it will not use a protocol to compact the data, instead, it will pack each metric individually, create a buffer, and send that.  At this time, Statsd does not allow for protocol-based metric sending over UDP.

The queuing operations are thread-safe.

## Usage

Once you have the `oxide.js` namespace in your project, usage is pretty simple.  To construct an oxide client, simply pass an object containing your arguments to the constructor, i.e.:

```js
var Oxide = require('oxide.js');

/**
 * The following options are supported:
 *   host: the hostname of your carbon server
 *   port: the port your carbon server runs on
 *   prefix: prefixes all paths with the given value (i.e., foo -> prefix.foo)
 *   interval: the time in msec to send statistics
 *   protocol: an instance of the protocol to send statistics with
 */
var oxideClient = new Oxide.Client.CarbonClient({
  host: '127.0.0.1',
  port: 2003,
  interval: 5000
});
```

To write a metric into Oxide's aggregate queue, simply fire off the `#record` method:

```js
// Connect to the server
oxideClient.connect();

// Start the queuing operations
oxideClient.start();

/**
 * #record takes three arguments, as described below:
 *   1) path - the path to write the metric to
 *   2) value - the value to write onto the metric
 *   3) [optional] timestamp - the time to record the metric
 */
oxideClient.record('my.path', 50, new Date());
```

A call to `#record` makes a `new Oxide.Metric` and dumps it in the queue.  After the time specified in the interval, `oxide.js` will collect all statistics currently in the queue, and pack them using the protocol, then send them up the wire.

The Statsd client is more interesting, since statsd supports more metric types.  All protocols described in [this spec](https://github.com/b/statsd_spec) are implemented by the client using a different method call.  Examples follow below:

```js
var client = new Oxide.Client.StatsdClient({ /* opts */ });
client.connect();
client.start();

// Send a counter metric to increment the `path` argument by 1, or the amount specified.
client.increment(path[, amount[, sampleRate]]);

// Send a counter metric to decrement the `path` given by 1, otherwise the amount specified.
client.decrement(path[, amount[, sampleRate]]);

// Send a gauge metric to set the value of `path` to the amount specified.
client.gauge(path, amount);

// Send a timer metric to mark the time of the `path` to the amount specified.
client.timing(path, duration); // duration in msec
```

That's it!

## Contributing

[Pull-requests](https://github.com/WatchBeam/oxide/pulls) are always appreciated!  If you want to add a feature, close an [issue](https://github.com/WatchBeam/oxide/issues) or otherwise, follow the following process:

1. Fork this repo
2. Cut a branch (with the convention `feature|bugfix/<branch-name>`
3. Write your feature/bugfix/etc
4. Write an accompanying test
5. Ensure that your tests pass (a call to `$ npm test` will verify this easily)
4. Submit a pull-request upstream!

## License

MIT
