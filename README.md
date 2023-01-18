# monoxide.js <!-- omit in toc -->
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
![npm version](https://img.shields.io/npm/v/monoxide.js?label=npm&style=flat-square)
![Github build status](https://img.shields.io/github/actions/workflow/status/raffaelecalza/monoxide.js/ci.yml?branch=main&style=flat-square)
[![License MIT](https://img.shields.io/github/license/raffaelecalza/monoxide.js?label=license&style=flat-square)](https://github.com/raffaelecalza/monoxide.js/blob/main/LICENSE)

monoxide.js is a Node.js client for Carbon that is a component of Graphite, and is responsible for receiving metrics over the network and writing them down to disk using a storage backend. This project is a fork of [Oxide](https://github.com/mixer/oxide) but currently supports only Carbon and not StatsD as Oxide does (I'm planning to add the support for StatsD in the next releases).

* [Installation](#installation)
* [Examples](#examples)
* [Usage](#usage)
  * [Configuration](#configuration)
  * [Protocols](#protocols)
    * [Pickle Protocol](#pickle-protocol)
    * [Plaintext Protocol](#plaintext-protocol)
    * [Create your custom protocol](#create-your-custom-protocol)
  * [Carbon client](#carbon-client)
* [Test](#test)
* [Contribution](#contribution)
* [Credits](#credits)

## Installation
To install this library, open a terminal and type:
```bash
npm i --save monoxide.js
```

Then, import the library in your project:
```js
const Monoxide = require('monoxide.js')
```

## Examples
Inside the folder `/examples` you can see an example of sending metrics to Carbon using monoxide.js.

## Usage
To start sending metrics to Carbon you need to create 3 objects:
1. the config object that stores the information about the server (Carbon)
2. the protocol object that formats the metrics before sending them to Carbon
3. the client that stores the metrics and periodically sends them to Carbon

### Configuration
After you installed and imported the library correctly, the first thing you need to create is a `Config` object. This class is responsible to store the data that will be used to connect to Carbon.
```js
const config = new Monoxide.Config('127.0.0.1', 1234, 10000, 'your.global.prefix')
```

The `config` object has 4 properties:
- _host_: the ip address of the host where Carbon is currently running (`127.0.0.1`)
- _port_: the port where Carbon is currently listening (`1234`)
- _interval_: the interval in ms each time the metrics are sent to the server (`10000`)
- _prefix_: the prefix that will be appended to every metric's path before sending the metric to Carbon (`your.global.prefix`)

The prefix is optional and can be omitted in the last parameter of the constructor if you don't want to prefix anything in the metric's path.

Also, if you don't pass anything to the constructor the config object will use the following parameters to connect to Carbon:
- host: `127.0.0.1`
- port: `2003`
- interval: `5000`
- prefix: `<nothing>`

### Protocols
After you have created the config object, you have to create the protocol object. This object will be the responsible of formatting the metrics before sending them to the server.

You can choose between 2 different types of protocols:
- **pickle protocol** [[More](https://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-pickle-protocol)]
- **plaintext protocol** [[More](https://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol)]

#### Pickle Protocol
You can create an instance of the pickle protocol like this:
```js
const protocol = new Monoxide.Protocols.PickleProtocol()
```

#### Plaintext Protocol
You can create an instance of the plaintext protocol like this:
```js
const protocol = new Monoxide.Protocols.PlaintextProtocol()
```

#### Create your custom protocol
If you want, you can create your custom protocol. Just override the `AbstractProtocol` class or create an instance of this class. If you want to know more, you can take a look at the `AbstractProtocol` class's code and also at the derived classes `PlaintextProtocol` and `PickleProtocol`.

### Carbon client
The client is the core component of the library. It's responsible of record, store and send metrics to the Carbon service. First, create the client:
```js
const client = new Monoxide.Clients.CarbonClient(config, protocol)
```

Then, you need to start the process that sends the metrics periodically and opens a socket connection to Carbon:
```js
client.start()
```

The client emits 2 events:
- `error`: everytime there is an error (for example, if there was an error sending the metrics)
- `metrics-sent`: everytime the metrics are correctly sent to Carbon

You should at least subscribe to the `error` event so you can process the errors:
```js
client.on('error', (err) => {
  // process the error
})

client.on('metrics-sent', () => {
  // do some stuff
})
```

Now, you can record metrics that will be sent periodically to Carbon (using the interval you specified in the config object):
```js
client.record('example.metric.1', 123, new Date())
```

The metric will be enqueued and sent the next time the process that sends metrics will be executed. If you have specified the prefix, the record method will add the prefix in front of the metric path.

Also, If you don't provide the date object, the metric will be stored with the timestamp of its creation.


If you need, you can stop the sending process and close the connection to the server (you can restart the process using the `.start()` method):
```js
client.stop()
```

## Test
If you want to test the code, clone the repo locally on your computer, install the project dependencies and then run:
```bash
npm test
```

## Contribution
If you find a bug or just want to contribute to the project, you can open an [issue](https://github.com/raffaelecalza/monoxide.js/issues/new) or fork the project and then open a pull request on branch `dev`.

## Credits
As I said above, this project is a fork of [Oxide](https://github.com/mixer/oxide). I decided to rewrite this library because on Github the project has been archived and on npm the last version doesn't reflect the code on Github.
