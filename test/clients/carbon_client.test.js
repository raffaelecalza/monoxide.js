const CarbonClient = require('../../lib/clients/carbon_client')
const MonoxideConfig = require('../../lib/config')
const Protocols = require('../../lib/protocols')

describe('Carbon Client tests', () => {
    it('create an instance of CarbonClient using the specified config and protocol', () => {
        let config = new MonoxideConfig('0.0.0.0', 1234, 1000, 'prefix')
        let protocol = new Protocols.PickleProtocol()

        let client = new CarbonClient(config, protocol)

        expect(client).not.toBeNull()
        expect(client).toBeInstanceOf(CarbonClient)
        expect(client.config).not.toBeNull()
        expect(client.config).toBeInstanceOf(MonoxideConfig)
        expect(client.config.host).toEqual('0.0.0.0')
        expect(client.config.port).toEqual(1234)
        expect(client.config.interval).toEqual(1000)
        expect(client.config.prefix).toEqual('prefix')
        expect(client.protocol).not.toBeNull()
        expect(client.protocol).toBeInstanceOf(Protocols.PickleProtocol)
    })

    it('create an instance of CarbonClient passing only config and using default protocol', () => {
        let config = new MonoxideConfig('0.0.0.0', 1234, 1000, 'prefix')

        let client = new CarbonClient(config)

        expect(client).not.toBeNull()
        expect(client).toBeInstanceOf(CarbonClient)
        expect(client.config).not.toBeNull()
        expect(client.config).toBeInstanceOf(MonoxideConfig)
        expect(client.config.host).toEqual('0.0.0.0')
        expect(client.config.port).toEqual(1234)
        expect(client.config.interval).toEqual(1000)
        expect(client.config.prefix).toEqual('prefix')
        expect(client.protocol).not.toBeNull()
        expect(client.protocol).toBeInstanceOf(Protocols.PlainTextProtocol)
    })

    it('throw an error if no config is provided', () => {
        expect(() => {new CarbonClient()}).toThrowError('A config object')
    })
})