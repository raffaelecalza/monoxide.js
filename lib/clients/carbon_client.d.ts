import MonoxideConfig from "../config/monoxide_config";
import AbstractProtocol from "../protocols/abstract_protocol";
import AbstractClient from "./abstract_client";

export default class CarbonClient extends AbstractClient {
    constructor(config: MonoxideConfig, protocol?: AbstractProtocol);

    record(path: string, value: number, timestamp?: Date): void;
}
