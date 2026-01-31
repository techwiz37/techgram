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
exports.Session = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const _0_deps_js_1 = require("../0_deps.js");
const _1_utilities_js_1 = require("../1_utilities.js");
const _3_transport_js_1 = require("../3_transport.js");
const _0_session_state_js_1 = require("./0_session_state.js");
// global Session ID counter for logs
let id = 0;
// @ts-ignore: lib
const defaultTransportProvider = typeof dntShim.Deno === "undefined" ? _3_transport_js_1.transportProviderWebSocket : _3_transport_js_1.transportProviderTcp;
class Session {
    #dc;
    #cdn;
    state = new _0_session_state_js_1.SessionState();
    transport;
    #lastConnect;
    #disconnected = true;
    #L;
    #onConnectionStateChange;
    constructor(dc, params) {
        this.#dc = dc;
        this.#cdn = params?.cdn ?? false;
        const transportProvider = params?.transportProvider ?? defaultTransportProvider();
        this.transport = transportProvider({ dc: this.#dc, cdn: this.#cdn });
        this.transport.connection.stateChangeHandler = (connected) => {
            setTimeout(() => {
                (0, _1_utilities_js_1.drop)(this.#stateChangeHandler(connected));
            });
        };
        this.#L = (0, _1_utilities_js_1.getLogger)("Session").client(id++);
    }
    set onConnectionStateChange(onConnectionStateChange) {
        this.#onConnectionStateChange = onConnectionStateChange;
    }
    set connectionCallback(connectionCallback) {
        this.transport.connection.callback = connectionCallback;
    }
    get dc() {
        return this.#dc;
    }
    get cdn() {
        return this.#cdn;
    }
    set serverSalt(serverSalt) {
        this.state.serverSalt = serverSalt;
    }
    get serverSalt() {
        return this.state.serverSalt;
    }
    #lastState;
    async #stateChangeHandler(connected) {
        if (this.#lastState !== connected) {
            setTimeout(() => {
                this.#onConnectionStateChange?.(connected);
            });
        }
        if (this.#lastState === connected) {
            return;
        }
        this.#lastState = connected;
        if (connected || this.#disconnected) {
            if (this.#disconnected) {
                this.#L.debug("not reconnecting because explicitly disconnected");
            }
            return;
        }
        if (this.#lastConnect && Date.now() - this.#lastConnect.getTime() <= 10 * _0_deps_js_1.SECOND) {
            this.#L.debug("reconnecting after a delay");
            await (0, _0_deps_js_1.delay)(3 * _0_deps_js_1.SECOND);
        }
        else {
            this.#L.debug("reconnecting");
        }
        await this.connect();
    }
    get connected() {
        return this.transport.connection.connected;
    }
    #connectMutex = new _1_utilities_js_1.Mutex();
    async connect() {
        const unlock = await this.#connectMutex.lock();
        try {
            if (this.connected) {
                return;
            }
            await this.transport.connection.open();
            await this.transport.transport.initialize();
            this.#lastConnect = new Date();
            this.#disconnected = false;
        }
        finally {
            unlock();
        }
    }
    async waitUntilConnected() {
        (await this.#connectMutex.lock())();
    }
    get disconnected() {
        return this.#disconnected;
    }
    disconnect() {
        this.#disconnected = true;
        if (this.transport.connection.connected) {
            this.transport.connection.close();
        }
    }
}
exports.Session = Session;
