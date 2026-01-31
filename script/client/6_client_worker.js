"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientWorker = void 0;
const _0_errors_js_1 = require("../0_errors.js");
const _1_logger_js_1 = require("../utilities/1_logger.js");
const _5_client_dispatcher_js_1 = require("./5_client_dispatcher.js");
class ClientWorker {
    #worker;
    #clients = new Map();
    #L = (0, _1_logger_js_1.getLogger)("ClientWorker");
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
            throw new _0_errors_js_1.InputError("Client already created");
        }
        const client = new _5_client_dispatcher_js_1.ClientDispatcher(this.#worker, id);
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
exports.ClientWorker = ClientWorker;
