import type { WorkerError } from "./0_worker_error.ts";

export declare namespace WorkerResponse {
  export interface Base {
    type: "response";
    clientId: string;
    id: string;
  }

  export interface Error extends Base {
    isError: true;
    data: WorkerError;
  }

  export interface Data extends Base {
    isError: false;
    data: unknown;
  }
}

export type WorkerResponse = WorkerResponse.Error | WorkerResponse.Data;
