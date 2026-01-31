import { ClientDispatcher, type ClientDispatcherParams } from "./5_client_dispatcher.js";
export declare class ClientWorker {
    #private;
    constructor(specifier: Worker);
    constructor(specifier: string | URL, options?: WorkerOptions);
    terminate(): void;
    createClient(id: string, params?: ClientDispatcherParams): Promise<ClientDispatcher>;
}
//# sourceMappingURL=6_client_worker.d.ts.map