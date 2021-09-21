const Monoxide = require('../src')

const config = new Monoxide.Config('127.0.0.1', 2003, 10000, 'example.carbon.client')
const protocol = new Monoxide.Protocols.PlainTextProtocol()

const client = new Monoxide.Clients.CarbonClient(config, protocol)

// client.connect()
client.start()
client.on('error', (err) => {
  console.log('There was an error')
  console.log(err)
})
client.on('metrics-sent', () => {
  console.log('Metrics correctly sent to Carbon')
})

client.record('metric.7', 20, new Date())
client.record('metric.9', 30, new Date())
client.record('metric.8', 10, new Date())

setTimeout(() => {
  client.stop()
}, 15000)
