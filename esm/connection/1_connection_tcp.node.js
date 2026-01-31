import { Socket } from "node:net";
import { ConnectionError } from "../0_errors.js";
import { getLogger, Mutex } from "../1_utilities.js";
const L = getLogger("ConnectionTCP");
const errConnectionNotOpen = new ConnectionError("The connection is not open.");
export class ConnectionTCP {
    #hostname;
    #port;
    #socket;
    #rMutex = new Mutex();
    #wMutex = new Mutex();
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
        this.#socket = new Socket();
        this.#socket.on("close", () => {
            this.#rejectRead();
            this.stateChangeHandler?.(false);
        });
        const mutex = new Mutex();
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
