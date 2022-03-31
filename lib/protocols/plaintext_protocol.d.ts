import CarbonMetric from "../metrics";
import AbstractProtocol from "./abstract_protocol";

export default class PlainTextProtocol extends AbstractProtocol {
    constructor();

    format(metrics: CarbonMetric[]): string;
}
