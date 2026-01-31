import * as dntShim from "../_dnt.shims.js";
import { concat, unreachable } from "../0_deps.js";
import { ConnectionError } from "../0_errors.js";
import { getLogger, Mutex } from "../1_utilities.js";
const L = getLogger("ConnectionWebSocket");
const errConnectionNotOpen = new ConnectionError("The connection is not open.");
export class ConnectionWebSocket {
    #url;
    #webSocket;
    #rMutex = new Mutex();
    #wMutex = new Mutex();
    #buffer = new Uint8Array();
    #nextResolve = null;
    stateChangeHandler;
    constructor(url) {
        this.#url = url;
    }
    #initWs() {
        return new Promise((resolve, reject) => {
            const webSocket = new dntShim.WebSocket(this.#url, "binary");
            const mutex = new Mutex();
            webSocket.addEventListener("close", () => {
                this.#rejectRead();
                this.stateChangeHandler?.(false);
            });
            webSocket.addEventListener("open", () => {
                this.stateChangeHandler?.(true);
                resolve(webSocket);
                L.debug("connected to", this.#url);
            });
            webSocket.addEventListener("message", async (e) => {
                if (typeof e.data === "string") {
                    return;
                }
                const unlock = await mutex.lock();
                const data = new Uint8Array(await new Blob([e.data].map((v) => v instanceof Blob || v instanceof Uint8Array ? v : v instanceof ArrayBuffer ? v : unreachable())).arrayBuffer());
                this.#buffer = concat([this.#buffer, data]);
                if (this.#nextResolve !== null && this.#buffer.length >= this.#nextResolve[0]) {
                    this.#nextResolve[1].resolve();
                    this.#nextResolve = null;
                }
                unlock();
            });
            webSocket.addEventListener("error", (err) => {
                if (this.#isConnecting) {
                    reject("message" in err ? new ConnectionError(err.message) : new ConnectionError("Failed to connect."));
                }
                if (this.connected) {
                    L.error(err);
                }
            });
        });
    }
    get connected() {
        return !!this.#webSocket && this.#webSocket.readyState === dntShim.WebSocket.OPEN;
    }
    #isConnecting = false;
    async open() {
        if (this.#isConnecting) {
            return;
        }
        this.#isConnecting = true;
        try {
            this.#webSocket = await this.#initWs();
        }
        finally {
            this.#isConnecting = false;
        }
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
            const slice = this.#buffer.slice(0, p.length);
            p.set(slice);
            this.#buffer = this.#buffer.slice(slice.length);
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
            this.#webSocket.send(p);
        }
        finally {
            unlock();
        }
    }
    #rejectRead() {
        if (this.#nextResolve !== null) {
            this.#nextResolve[1].reject(errConnectionNotOpen);
            this.#nextResolve = null;
        }
    }
    close() {
        this.#assertConnected();
        this.#webSocket.close(1000, "method");
        this.#webSocket = undefined;
        this.#rejectRead();
    }
}
