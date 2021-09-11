const MonoxideConfig = require('../../src/config/monoxide_config')

describe('Monoxide Config test', () => {
    test('create an instance of MonoxideConfig class using all parameters of constructor', () => {
        const conf = new MonoxideConfig('127.0.0.1', 1234, 10000, 'custom.prefix')

        expect(conf._host).toEqual('127.0.0.1')
        expect(conf._port).toEqual(1234)
        expect(conf._interval).toEqual(10000)
        expect(conf._prefix).toEqual('custom.prefix')
    })

    test('create an instance of MonoxideConfig class withouth prefix', () => {
        const conf = new MonoxideConfig('127.0.0.1', 1234, 10000)

        expect(conf._host).toEqual('127.0.0.1')
        expect(conf._port).toEqual(1234)
        expect(conf._interval).toEqual(10000)
        expect(conf._prefix).toBe(null)
    })

    test('create an instance of MonoxideConfig class using default parameters', () => {
        const conf = new MonoxideConfig()

        expect(conf._host).toEqual('127.0.0.1')
        expect(conf._port).toEqual(2003)
        expect(conf._interval).toEqual(5000)
        expect(conf._prefix).toBe(null)
    })

    test('read property values using getters', () => {
        const conf = new MonoxideConfig('127.0.0.1', 1234, 10000, 'custom.prefix')

        expect(conf.host).toEqual('127.0.0.1')
        expect(conf.port).toEqual(1234)
        expect(conf.interval).toEqual(10000)
        expect(conf.prefix).toEqual('custom.prefix')
    })

    test('set property values using setters', () => {
        const conf = new MonoxideConfig()

        conf.host = 'localhost'
        conf.port = 1234
        conf.interval = 10000
        conf.prefix = 'custom.prefix'

        expect(conf._host).toEqual('localhost')
        expect(conf._port).toEqual(1234)
        expect(conf._interval).toEqual(10000)
        expect(conf._prefix).toEqual('custom.prefix')
    })

    test('toString method', () => {
        const conf = new MonoxideConfig()

        expect(conf.toString()).toEqual('prefix=<nothing>,host=127.0.0.1,port=2003,interval=5000')
    })
})