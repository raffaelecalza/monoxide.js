import CarbonMetric from '../metrics/carbon_metric';

export type TransformFunction = (metric: CarbonMetric) => string[];

export default abstract class AbstractProtocol {
    constructor(transformFunction: TransformFunction);

    transformTimestamp(timestamp: number): number;
}
