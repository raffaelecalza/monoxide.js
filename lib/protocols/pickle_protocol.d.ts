import CarbonMetric from "../metrics";
import AbstractProtocol from "./abstract_protocol";

export default class PickleProtocol extends AbstractProtocol {
    constructor();

    format(metrics: CarbonMetric[]): string;
}
