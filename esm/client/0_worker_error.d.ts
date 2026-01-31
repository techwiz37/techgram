export interface WorkerError {
    name: "TelegramError" | "ConnectionError" | "AccessError" | "InputError" | "TransportError" | "TLError";
    args: any;
}
export declare function serializeWorkerError(err: unknown): WorkerError;
export declare function deserializeWorkerError(error: WorkerError): TypeError;
//# sourceMappingURL=0_worker_error.d.ts.map