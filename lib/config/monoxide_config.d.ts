/// <reference types="node" />
export default class MonoxideConfig {
    constructor(host?: string, port?: number, interval?: number, prefix?: string|null);

    get host(): string;
    set host(value: string);

    get port(): number;
    set port(value: number);

    get interval(): number;
    set interval(value: number);

    get prefix(): string|null;
    set prefix(value: string|null);
}
