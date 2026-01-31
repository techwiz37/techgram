import { concat, unreachable } from "../0_deps.ts";
import { ConnectionError } from "../0_errors.ts";
import { getLogger, Mutex } from "../1_utilities.ts";
import type { Connection } from "./0_connection.ts";
import { WebSocket } from "ws";

const L = getLogger("ConnectionWebSocket");
const errConnectionNotOpen = new ConnectionError("The connection is not open.");

export class ConnectionWebSocket implements Connection {
  #url: string;
  #webSocket?: WebSocket;
  #rMutex = new Mutex();
  #wMutex = new Mutex();
  #buffer = new Uint8Array();
  #nextResolve: [number, { resolve: () => void; reject: (err: unknown) => void }] | null = null;
  stateChangeHandler?: Connection["stateChangeHandler"];

  constructor(url: string) {
    this.#url = url;
  }

  #initWs() {
    return new Promise<WebSocket>((resolve, reject) => {
      const webSocket = new WebSocket(this.#url, { binaryType: "arraybuffer" });
      const mutex = new Mutex();
      
      webSocket.on("close", () => {
        this.#rejectRead();
        this.stateChangeHandler?.(false);
      });
      
      webSocket.on("open", () => {
        this.stateChangeHandler?.(true);
        resolve(webSocket);
        L.debug("connected to", this.#url);
      });
      
      webSocket.on("message", async (data: Buffer | ArrayBuffer | Buffer[]) => {
        if (typeof data === "string") {
          return;
        }
        const unlock = await mutex.lock();
        const arrayBuffer = data instanceof ArrayBuffer 
          ? data 
          : data instanceof Buffer 
            ? data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
            : unreachable();
        
        const uint8Array = new Uint8Array(arrayBuffer);
        this.#buffer = concat([this.#buffer, uint8Array]);

        if (
          this.#nextResolve !== null && this.#buffer.length >= this.#nextResolve[0]
        ) {
          this.#nextResolve[1].resolve();
          this.#nextResolve = null;
        }

        unlock();
      });
      
      webSocket.on("error", (err: Error) => {
        if (this.#isConnecting) {
          reject(new ConnectionError(err.message || "Failed to connect."));
        }
        if (this.connected) {
          L.error(err);
        }
      });
    });
  }

  get connected(): boolean {
    return !!this.#webSocket && this.#webSocket.readyState === WebSocket.OPEN;
  }

  #isConnecting = false;
  async open() {
    if (this.#isConnecting) {
      return;
    }
    this.#isConnecting = true;

    try {
      this.#webSocket = await this.#initWs();
    } finally {
      this.#isConnecting = false;
    }
  }

  #assertConnected() {
    if (!this.connected) {
      throw errConnectionNotOpen;
    }
  }

  async read(p: Uint8Array) {
    this.#assertConnected();
    const unlock = await this.#rMutex.lock();
    try {
      this.#assertConnected();
      if (this.#buffer.length < p.length) {
        await new Promise<void>((resolve, reject) => this.#nextResolve = [p.length, { resolve, reject }]);
      }
      const slice = this.#buffer.slice(0, p.length);
      p.set(slice);
      this.#buffer = this.#buffer.slice(slice.length);
    } finally {
      unlock();
    }
  }

  async write(p: Uint8Array) {
    this.#assertConnected();
    const unlock = await this.#wMutex.lock();
    try {
      this.#assertConnected();
      this.#webSocket!.send(p);
    } finally {
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
    this.#webSocket!.close(1000, "method");
    this.#webSocket = undefined;
    this.#rejectRead();
  }
}
