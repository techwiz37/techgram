export interface WorkerRequest {
    type: "request";
    clientId: string;
    id: string;
    method: "initClient" | string;
    args: unknown[];
}
//# sourceMappingURL=0_worker_request.d.ts.map