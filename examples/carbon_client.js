// import Monoxide library
const Monoxide = require('../lib')

// create config object
const config = new Monoxide.Config('127.0.0.1', 2003, 10000, 'example.carbon.client')
// create protocol object
const protocol = new Monoxide.Protocols.PlainTextProtocol()

// create client object passing config and protocol
const client = new Monoxide.Clients.CarbonClient(config, protocol)

// start monoxide so every 10s sends metrics to Carbon
client.start()

// subscribe to 'error' event that will be emitted whenever there is an error
// (recommended)
client.on('error', (err) => {
  console.log('There was an error')
  console.log(err)
})

// subscribe to 'metrics-sent' event that will be emitted whenever the metrics are sent correctly to Carbon
// (optional)
client.on('metrics-sent', () => {
  console.log('Metrics correctly sent to Carbon')
})

// record 3 example metrics, the complete path will be 'example.carbon.client.metric.<number>'
client.record('metric.7', 20, new Date())
client.record('metric.9', 30, new Date())
client.record('metric.8', 10, new Date())

// NOTE: THE LINES BELOW ARE FUNCTIONAL ONLY FOR THE EXAMPLE TO WORK
// after 15s, stop monoxide from sending metrics and close the connection to the socket
setTimeout(() => {
  client.stop()
}, 15000)
