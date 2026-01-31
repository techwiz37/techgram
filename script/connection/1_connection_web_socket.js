"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionWebSocket = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _0_errors_js_1 = require("../0_errors.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const L = (0, _1_utilities_js_1.getLogger)("ConnectionWebSocket");
const errConnectionNotOpen = new _0_errors_js_1.ConnectionError("The connection is not open.");
class ConnectionWebSocket {
    #url;
    #webSocket;
    #rMutex = new _1_utilities_js_1.Mutex();
    #wMutex = new _1_utilities_js_1.Mutex();
    #buffer = new Uint8Array();
    #nextResolve = null;
    stateChangeHandler;
    constructor(url) {
        this.#url = url;
    }
    #initWs() {
        return new Promise((resolve, reject) => {
            const webSocket = new dntShim.WebSocket(this.#url, "binary");
            const mutex = new _1_utilities_js_1.Mutex();
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
                const data = new Uint8Array(await new Blob([e.data].map((v) => v instanceof Blob || v instanceof Uint8Array ? v : v instanceof ArrayBuffer ? v : (0, _0_deps_js_1.unreachable)())).arrayBuffer());
                this.#buffer = (0, _0_deps_js_1.concat)([this.#buffer, data]);
                if (this.#nextResolve !== null && this.#buffer.length >= this.#nextResolve[0]) {
                    this.#nextResolve[1].resolve();
                    this.#nextResolve = null;
                }
                unlock();
            });
            webSocket.addEventListener("error", (err) => {
                if (this.#isConnecting) {
                    reject("message" in err ? new _0_errors_js_1.ConnectionError(err.message) : new _0_errors_js_1.ConnectionError("Failed to connect."));
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
exports.ConnectionWebSocket = ConnectionWebSocket;
