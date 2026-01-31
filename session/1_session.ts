import { delay, SECOND } from "../0_deps.ts";
import { drop, getLogger, type Logger, Mutex } from "../1_utilities.ts";
import type { Connection, ConnectionCallback } from "../2_connection.ts";
import { type DC, type TransportProvider, transportProviderTcp, transportProviderWebSocket } from "../3_transport.ts";
import { SessionState } from "./0_session_state.ts";

let id = 0;

const defaultTransportProvider = typeof Deno === "undefined" ? transportProviderWebSocket : transportProviderTcp;

export interface SessionParams {

  transportProvider?: TransportProvider;

  cdn?: boolean;
}

export abstract class Session {
  #dc: DC;
  #cdn: boolean;
  protected state: SessionState = new SessionState();
  protected transport: ReturnType<TransportProvider>;
  #lastConnect?: Date;
  #disconnected = true;
  #L: Logger;
  #onConnectionStateChange: Connection["stateChangeHandler"];

  constructor(dc: DC, params?: SessionParams) {
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

  set onConnectionStateChange(onConnectionStateChange: Connection["stateChangeHandler"]) {
    this.#onConnectionStateChange = onConnectionStateChange;
  }

  set connectionCallback(connectionCallback: ConnectionCallback | undefined) {
    this.transport.connection.callback = connectionCallback;
  }

  get dc(): DC {
    return this.#dc;
  }

  get cdn(): boolean {
    return this.#cdn;
  }

  set serverSalt(serverSalt: bigint) {
    this.state.serverSalt = serverSalt;
  }

  get serverSalt(): bigint {
    return this.state.serverSalt;
  }

  #lastState?: boolean;
  async #stateChangeHandler(connected: boolean) {
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
    } else {
      this.#L.debug("reconnecting");
    }

    await this.connect();
  }

  get connected(): boolean {
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
    } finally {
      unlock();
    }
  }

  protected async waitUntilConnected() {
    (await this.#connectMutex.lock())();
  }

  get disconnected(): boolean {
    return this.#disconnected;
  }

  disconnect() {
    this.#disconnected = true;
    if (this.transport.connection.connected) {
      this.transport.connection.close();
    }
  }

  abstract send(body: Uint8Array): Promise<bigint>;
}
