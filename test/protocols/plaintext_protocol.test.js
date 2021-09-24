const Timekeeper = require('timekeeper')
const CarbonMetric = require('../../lib/metrics/carbon_metric')
const PlaintextProtocol = require('../../lib/protocols/plaintext_protocol')

describe('Plaintext Protocol test', () => {
    test('create an instance of PlaintextProtocol class', () => {
        const prot = new PlaintextProtocol()

        expect(prot._transformFunction).toBeInstanceOf(Function)
    })

    test('format metrics following the plaintext format', () => {
        const transformFunction = (metric) => [metric.path, metric.value, (Math.floor(metric.timestamp / 1000))].join(' ')
        const prot = new PlaintextProtocol()
        const time = new Date()
        Timekeeper.freeze(time)

        const metrics = [
            new CarbonMetric('test.metric.1', 1),
            new CarbonMetric('test.metric.2', 2, new Date()),
            new CarbonMetric('test.metric.3', 100, new Date())
        ]

        let expectedResult = metrics.map(transformFunction).join('\n')
        expect(prot.format(metrics)).toEqual(expectedResult)

        Timekeeper.reset()
    })
})