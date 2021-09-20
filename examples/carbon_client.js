const Monoxide = require('../src')

let config = new Monoxide.Config('127.0.0.1', 2003, 10000, 'example.carbon.client')
let protocol = new Monoxide.Protocols.PlainTextProtocol()

let client = new Monoxide.Clients.CarbonClient(config, protocol)

//client.connect()
client.start()
client.on('error', (err) => {
    console.log('There was an error')
    console.log(err)
})
client.on('metrics-sent', () => {
    console.log('Metrics correctly sent to Carbon')
})

client.record('metric.1', 20, new Date())
client.record('metric.2', 30, new Date())
client.record('metric.3', 10, new Date())

setTimeout(() => {
    client.stop()
}, 15000)