"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEncryptedPool = void 0;
class ClientEncryptedPool {
    #index = 0;
    #clients = new Array();
    get size() {
        return this.#clients.length;
    }
    add(client) {
        this.#clients.push(client);
    }
    nextClient() {
        const client = this.#clients[this.#index];
        if (this.#index >= this.#clients.length - 1) {
            this.#index = 0;
        }
        else {
            ++this.#index;
        }
        return client;
    }
    disconnect() {
        for (const client of this.#clients) {
            client.disconnect();
        }
    }
    map(callback) {
        this.#clients.map(callback);
    }
}
exports.ClientEncryptedPool = ClientEncryptedPool;
