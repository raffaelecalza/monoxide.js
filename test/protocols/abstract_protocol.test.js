const Timekeeper = require('timekeeper')
const AbstractProtocol = require('../../lib/protocols/abstract_protocol')
const CarbonMetric = require('../../lib/metrics/carbon_metric')

describe('Abstract Protocol test', () => {
    test('create an instance of abstract protocol', () => {
        const transformFunction = (metric) => 'metric_test'
        const prot = new AbstractProtocol(transformFunction)

        expect(prot._transformFunction).toEqual(transformFunction)
    })

    test('constructor throws an error if no transform function specified', () => {
        expect(() => {
            new AbstractProtocol()
        }).toThrowError()
    })

    test('transform timestamp function', () => {
        const time = new Date()
        Timekeeper.freeze()

        const transformFunction = (metric) => 'metric_test'
        const prot = new AbstractProtocol(transformFunction)
        const transformedTimestamp = prot.transformTimestamp(time.getTime())
        expect(transformedTimestamp).toEqual(Math.floor(time.getTime() / 1000))

        Timekeeper.reset()
    })

    test('format metrics passed using transformFunction and joinSequence', () => {
        const transformFunction = (metric) => `${metric.path},${metric.value},${metric.timestamp}`
        const prot = new AbstractProtocol(transformFunction)
        const time = new Date()
        Timekeeper.freeze(time)

        const metrics = [
            new CarbonMetric('test.metric.1', 1),
            new CarbonMetric('test.metric.2', 2, new Date()),
            new CarbonMetric('test.metric.3', 100, new Date())
        ]

        let expectedResult = metrics.map(transformFunction).join('\n')
        expect(prot.format(metrics, '\n')).toEqual(expectedResult)

        Timekeeper.reset()
    })
})