import { InputError } from "../0_errors.js";
import { getLogger } from "../utilities/1_logger.js";
import { ClientDispatcher } from "./5_client_dispatcher.js";
export class ClientWorker {
    #worker;
    #clients = new Map();
    #L = getLogger("ClientWorker");
    constructor(specifier, options) {
        this.#worker = specifier instanceof Worker ? specifier : new Worker(specifier, options);
        this.#worker.addEventListener("message", async (e) => {
            this.#L.debug("received message from worker", e.data);
            const message = e.data;
            if (message.type === "response") {
                this.#clients.get(message.clientId)?.handleResponse(message);
            }
            else if (message.type === "request") {
                if (message.method === "handleInvokeError") {
                    const client = this.#clients.get(message.clientId);
                    if (client) {
                        const result = await client.handleInvokeError(message);
                        const response = {
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
    async createClient(id, params) {
        if (this.#clients.has(id)) {
            throw new InputError("Client already created");
        }
        const client = new ClientDispatcher(this.#worker, id);
        this.#clients.set(id, client);
        try {
            await client.init(params);
        }
        catch (err) {
            this.#clients.delete(id);
            throw err;
        }
        return client;
    }
}
