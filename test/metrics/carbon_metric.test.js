const Timekeeper = require("timekeeper")
const CarbonMetric = require('../../src/metrics/carbon_metric')

describe('Carbon Metric test', () => {
    test('create an instance of CarbonMetric with values set correctly', () => {
        const date = new Date(2021, 1, 1, 1, 1, 1, 0)
        const testMetric = new CarbonMetric('test.monoxide.metric.carbon', 1, date)

        expect(testMetric.path).toBe('test.monoxide.metric.carbon')
        expect(testMetric.value).toBe(1)
        expect(testMetric.timestamp).toEqual(date)
    })

    test('create an instance of CarbonMetric without date (set it to Date.now)', () => {
        var time = new Date()
        Timekeeper.freeze(time)

        const testMetric = new CarbonMetric('test.monoxide.metric.carbon', 1);
        expect(testMetric.path).toBe('test.monoxide.metric.carbon')
        expect(testMetric.value).toBe(1)
        expect(testMetric.timestamp).toEqual(new Date())

        Timekeeper.reset()
    })
});