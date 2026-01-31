"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionTCP = void 0;
const node_net_1 = require("node:net");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const L = (0, _1_utilities_js_1.getLogger)("ConnectionTCP");
const errConnectionNotOpen = new _0_errors_js_1.ConnectionError("The connection is not open.");
class ConnectionTCP {
    #hostname;
    #port;
    #socket;
    #rMutex = new _1_utilities_js_1.Mutex();
    #wMutex = new _1_utilities_js_1.Mutex();
    #buffer = new Array();
    #nextResolve = null;
    stateChangeHandler;
    constructor(hostname, port) {
        this.#hostname = hostname;
        this.#port = port;
    }
    #rejectRead() {
        if (this.#nextResolve !== null) {
            this.#nextResolve[1].reject(errConnectionNotOpen);
            this.#nextResolve = null;
        }
    }
    open() {
        if (this.connected) {
            return;
        }
        this.#socket = new node_net_1.Socket();
        this.#socket.on("close", () => {
            this.#rejectRead();
            this.stateChangeHandler?.(false);
        });
        const mutex = new _1_utilities_js_1.Mutex();
        this.#socket.on("data", async (data) => {
            const unlock = await mutex.lock();
            for (const byte of data) {
                this.#buffer.push(byte);
            }
            if (this.#nextResolve !== null && this.#buffer.length >= this.#nextResolve[0]) {
                const resolve = this.#nextResolve[1].resolve;
                this.#nextResolve = null;
                resolve();
            }
            unlock();
        });
        return new Promise((resolve, reject) => {
            this.#socket.connect(this.#port, this.#hostname);
            this.#socket.once("error", reject);
            this.#socket.once("connect", () => {
                this.#socket.off("error", reject);
                resolve();
                this.stateChangeHandler?.(true);
                L.debug("connected to", this.#hostname, "port", this.#port);
            });
        });
    }
    get connected() {
        return this.#socket?.readyState === "open";
    }
    #assertConnected() {
        if (!this.connected) {
            throw errConnectionNotOpen;
        }
    }
    async read(p) {
        this.#assertConnected();
        const unlock = await this.#rMutex.lock();
        try {
            this.#assertConnected();
            if (this.#buffer.length < p.length) {
                await new Promise((resolve, reject) => this.#nextResolve = [p.length, { resolve, reject }]);
            }
            p.set(this.#buffer.splice(0, p.length));
        }
        finally {
            unlock();
        }
    }
    async write(p) {
        this.#assertConnected();
        const unlock = await this.#wMutex.lock();
        try {
            this.#assertConnected();
            try {
                await new Promise((resolve, reject) => {
                    this.#socket.write(p, (err) => {
                        (err === undefined || err === null) ? resolve() : reject(err);
                    });
                });
            }
            catch (err) {
                if (!this.connected) {
                    throw errConnectionNotOpen;
                }
                else {
                    throw err;
                }
            }
        }
        finally {
            unlock();
        }
    }
    close() {
        this.#assertConnected();
        this.#socket.destroy();
        this.#socket = undefined;
    }
}
exports.ConnectionTCP = ConnectionTCP;
