export default class CarbonMetric {
    path: string;
    value: number;
    timestamp: Date;

    constructor(path: string, value: number, timestamp?: Date);
}
