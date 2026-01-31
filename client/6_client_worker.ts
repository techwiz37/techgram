import { InputError } from "../0_errors.ts";
import { getLogger } from "../utilities/1_logger.ts";
import type { WorkerRequest } from "./0_worker_request.ts";
import type { WorkerResponse } from "./1_worker_response.ts";
import { ClientDispatcher, type ClientDispatcherParams } from "./5_client_dispatcher.ts";

export class ClientWorker {
  #worker: Worker;
  #clients = new Map<string, ClientDispatcher>();
  #L = getLogger("ClientWorker");

  constructor(specifier: Worker);
  constructor(specifier: string | URL, options?: WorkerOptions);
  constructor(specifier: Worker | string | URL, options?: WorkerOptions) {
    this.#worker = specifier instanceof Worker ? specifier : new Worker(specifier, options);
    this.#worker.addEventListener("message", async (e) => {
      this.#L.debug("received message from worker", e.data);

      const message = e.data as WorkerResponse | WorkerRequest;
      if (message.type === "response") {
        this.#clients.get(message.clientId)?.handleResponse(message);
      } else if (message.type === "request") {
        if (message.method === "handleInvokeError") {
          const client = this.#clients.get(message.clientId);
          if (client) {
            const result = await client.handleInvokeError(message);
            const response: WorkerResponse = {
              type: "response",
              clientId: message.clientId,
              id: message.id,
              isError: false,
              data: result,
            };
            this.#worker.postMessage(response);
          }
        }
      }
    });
  }

  terminate() {
    this.#worker.terminate();
  }

  async createClient(id: string, params?: ClientDispatcherParams): Promise<ClientDispatcher> {
    if (this.#clients.has(id)) {
      throw new InputError("Client already created");
    }

    const client = new ClientDispatcher(this.#worker, id);
    this.#clients.set(id, client);
    try {
      await client.init(params);
    } catch (err) {
      this.#clients.delete(id);
      throw err;
    }
    return client;
  }
}
