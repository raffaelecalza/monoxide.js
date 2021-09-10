class MonoxideConfig {
    #host;
    #port;
    #interval;
    #prefix

    constructor(host, port, interval, prefix) {
        this.#host = host || "127.0.0.1";
        this.#port = port || 2003;
        this.#interval = interval || 5000;
        this.#prefix = prefix;
    }

    get host() { return this.#host; }
    set host(host) { this.#host = host; }

    get port() { return this.#port; }
    set port(port) { this.#port = port; }

    get interval() { return this.#interval; }
    set interval(interval) { this.#interval = interval; }

    get prefix() { return this.#prefix; }
    set prefix(prefix) { this.#prefix = prefix; }

    toString() {
        return `prefix=${prefix},host=${this.host},port=${this.port},interval=${this.interval}`;
    }
}

module.exports = MonoxideConfig;