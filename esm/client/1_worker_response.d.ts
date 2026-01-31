import type { WorkerError } from "./0_worker_error.js";
export declare namespace WorkerResponse {
    interface Base {
        type: "response";
        clientId: string;
        id: string;
    }
    interface Error extends Base {
        isError: true;
        data: WorkerError;
    }
    interface Data extends Base {
        isError: false;
        data: unknown;
    }
}
export type WorkerResponse = WorkerResponse.Error | WorkerResponse.Data;
//# sourceMappingURL=1_worker_response.d.ts.map