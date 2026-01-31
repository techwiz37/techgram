import type { ClientEncrypted } from "./2_client_encrypted.ts";

export class ClientEncryptedPool {
  #index = 0;
  #clients = new Array<ClientEncrypted>();

  get size() {
    return this.#clients.length;
  }

  add(client: ClientEncrypted) {
    this.#clients.push(client);
  }

  nextClient() {
    const client = this.#clients[this.#index];
    if (this.#index >= this.#clients.length - 1) {
      this.#index = 0;
    } else {
      ++this.#index;
    }
    return client;
  }

  disconnect() {
    for (const client of this.#clients) {
      client.disconnect();
    }
  }

  map(callback: (client: ClientEncrypted) => void) {
    this.#clients.map(callback);
  }
}
