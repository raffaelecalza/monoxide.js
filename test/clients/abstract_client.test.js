const net = require('net')
const EventEmitter = require('events')
const Timekeeper = require('timekeeper')
const AbstractClient = require('../../src/clients/abstract_client')
const MonoxideConfig = require('../../src/config/monoxide_config')
const PlaintextProtocol = require('../../src/protocols/plaintext_protocol')
const CarbonMetric = require('../../src/metrics/carbon_metric')

describe('Abstract Client test', () => {
    let globalProtocol, globalConfig, globalClient, server, clientConnectedCb, dataCb

    beforeAll((done) => {
        globalConfig = new MonoxideConfig('127.0.0.1', 10001, 5000, 'test.client')
        globalProtocol = new PlaintextProtocol()
        globalClient = new AbstractClient(globalConfig, globalProtocol)
        server = net.createServer((socket) => {
            socket.setEncoding('utf-8')
            socket.on('data', (data) => {
                dataCb && dataCb(data)
            })

            clientConnectedCb && clientConnectedCb() // used when testing the _connect method
        }).listen(10001, '127.0.0.1', () => {
            done()
        })
    })

    beforeEach(() => {
        // mock intervals and timeouts using jest
        jest.useFakeTimers('legacy')
    })

    afterEach(() => {
        globalClient._queue = []

        jest.clearAllTimers()
        jest.clearAllMocks()
        jest.useRealTimers()
    })

    afterAll((done) => {
        server.close(() => {
            done()
        })
    })

    test('create an instance of AbstractClient', () => {
        let client = new AbstractClient(globalConfig, globalProtocol)

        expect(client).toBeInstanceOf(EventEmitter)
        expect(client.config).toEqual(globalConfig)
        expect(client.protocol).toEqual(globalProtocol)
        expect(client._queue).toBeInstanceOf(Array)
        expect(client._queue.length).toEqual(0)
        expect(client._interval).toBe(null)
        expect(client._socket).toBeInstanceOf(net.Socket)
    })

    test('throw an error if config is not passed to constructor', () => {
        expect(() => {new AbstractClient()}).toThrowError()
    })

    test('throw an error if protocol is not passed to constructor', () => {
        expect(() => {new AbstractClient(globalConfig)}).toThrowError()
    })

    test('pathify should return prefix + path', () => {
        expect(globalClient._pathify('metric.1')).toEqual('test.client.metric.1')
        globalClient.config.prefix = ''
        expect(globalClient._pathify('metric.1')).toEqual('metric.1')
        globalClient.config.prefix = 'test.client'
    })

    test('correctly enqueue a metric', () => {
        let metric = new CarbonMetric('metric.1', 1, new Date())
        globalClient._enqueue(metric)
        expect(globalClient._queue.length).toEqual(1)
        expect(globalClient._queue[0]).toEqual(metric)
    })

    test('throws an error when socket is not ready', (done) => {
        globalClient.config.port = 10002 // no server listening on this port
        globalClient.on('error', (err) => {
            expect(err).not.toBe(null)
            done()
        })

        globalClient._connect()
        globalClient.config.port = 10001
    })

    test('opens and close a connection to metrics service', (done) => {
        clientConnectedCb = () => {
            clientConnectedCb = null

            globalClient._disconnect()
            expect(globalClient._socket.destroyed).toEqual(true)

            done()
        }

        globalClient._connect()
    })

    test('start interval sending metrics', (done) => {
        const sendMetricsMock = jest.spyOn(globalClient, '_sendMetrics')
        globalClient.start()
        clientConnectedCb = () => {
            clientConnectedCb = null
            expect(setInterval).toHaveBeenCalledTimes(1)
            expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), globalClient.config.interval)
            jest.advanceTimersByTime(5000); // move time forward

            expect(globalClient._sendMetrics).not.toBeCalled()
            globalClient.stop()

            expect(globalClient._interval).toBe(null)
            expect(globalClient._socket.destroyed).toEqual(true)
            
            sendMetricsMock.mockRestore()
            done()
        }
    })

    test('interval should send metrics with the correct format to the server', (done) => {
        Timekeeper.freeze(new Date())
        const config = new MonoxideConfig('127.0.0.1', 10001, 5000, 'test.client')
        const protocol = new PlaintextProtocol()
        const client = new AbstractClient(config, protocol)
        dataCb = (data) => {
            dataCb = null
            client.stop()
            let timestamp = Math.floor(Date.now() / 1000)
            const expectedResult = `metric.1 ${timestamp} 1\nmetric.2 ${timestamp} 2\nmetric.3 ${timestamp} 3\r\n`
            expect(data).toEqual(expectedResult)
            expect(client._queue.length).toEqual(0)
            Timekeeper.reset()
            done()
        }

        client.start()
        client._enqueue(new CarbonMetric('metric.1', 1, new Date()))
        client._enqueue(new CarbonMetric('metric.2', 2, new Date()))
        client._enqueue(new CarbonMetric('metric.3', 3, new Date()))
        
        jest.advanceTimersByTime(5000) // move time forward
    })
})