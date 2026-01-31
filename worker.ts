import { getLogger } from "./1_utilities.ts";
import type { ClientDispatcherParams, WorkerRequest, WorkerResponse } from "./mod.ts";
import { ClientReceiver } from "./client/6_client_receiver.ts";
import { serializeWorkerError } from "./client/0_worker_error.ts";

const clientReceivers = new Map<string, ClientReceiver>();
const logger = getLogger("TechgramWorker");

addEventListener("message", async (e) => {
  const message = (e as { data: WorkerRequest | WorkerResponse }).data;
  if (message.type === "response") {
    clientReceivers.get(message.clientId)?.handleResponse(message);
    return;
  }

  const clientReceiver = clientReceivers.get(message.clientId);
  let response: WorkerResponse;

  if (message.method === "initClient") {
    response = initClient(message);
  } else if (!clientReceiver) {
    response = {
      type: "response",
      clientId: message.clientId,
      id: message.id,
      isError: true,
      data: {
        name: "InputError",
        args: "Client not inited",
      },
    };
  } else {
    try {

      const data = await clientReceiver.client[message.method](...message.args);
      response = {
        type: "response",
        clientId: message.clientId,
        id: message.id,
        isError: false,
        data,
      };
    } catch (err) {
      response = {
        type: "response",
        clientId: message.clientId,
        id: message.id,
        isError: true,
        data: serializeWorkerError(err),
      };
    }
  }

  logger.debug("posting response message", response);
  postMessage(response);
});

export function initClient(request: WorkerRequest): WorkerResponse {
  if (clientReceivers.has(request.clientId)) {
    return {
      type: "response",
      clientId: request.clientId,
      id: request.id,
      isError: true,
      data: {
        name: "InputError",
        args: "Client already inited",
      },
    };
  } else {
    try {
      const params = request.args[0] as ClientDispatcherParams | undefined;
      const clientReceiver = new ClientReceiver(request.clientId, params);
      clientReceivers.set(request.clientId, clientReceiver);

      return {
        type: "response",
        clientId: request.clientId,
        id: request.id,
        isError: false,
        data: null,
      };
    } catch (err) {
      clientReceivers.delete(request.clientId);
      logger.error("error initing client:", err);
      return {
        type: "response",
        clientId: request.clientId,
        id: request.id,
        isError: true,
        data: serializeWorkerError(new InputEvent("Could not init client")),
      };
    }
  }
}
