import * as dntShim from "../_dnt.shims.js";
import { delay, SECOND } from "../0_deps.js";
import { drop, getLogger, Mutex } from "../1_utilities.js";
import { transportProviderTcp, transportProviderWebSocket } from "../3_transport.js";
import { SessionState } from "./0_session_state.js";
// global Session ID counter for logs
let id = 0;
// @ts-ignore: lib
const defaultTransportProvider = typeof dntShim.Deno === "undefined" ? transportProviderWebSocket : transportProviderTcp;
export class Session {
    #dc;
    #cdn;
    state = new SessionState();
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
                drop(this.#stateChangeHandler(connected));
            });
        };
        this.#L = getLogger("Session").client(id++);
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
        if (this.#lastConnect && Date.now() - this.#lastConnect.getTime() <= 10 * SECOND) {
            this.#L.debug("reconnecting after a delay");
            await delay(3 * SECOND);
        }
        else {
            this.#L.debug("reconnecting");
        }
        await this.connect();
    }
    get connected() {
        return this.transport.connection.connected;
    }
    #connectMutex = new Mutex();
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
