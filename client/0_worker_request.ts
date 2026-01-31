export interface WorkerRequest {
  type: "request";
  clientId: string;
  id: string;
  method: "initClient" | string;
  args: unknown[];
}
