/// <reference types="node" />
import { EventEmitter } from "events";
import MonoxideConfig from "../config/monoxide_config";
import AbstractProtocol from "../protocols/abstract_protocol";

export default abstract class AbstractClient extends EventEmitter {
    constructor(config: MonoxideConfig, protocol: AbstractProtocol);

    start(): void;
    stop(): void;
}
