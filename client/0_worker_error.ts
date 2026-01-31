import { AccessError, ConnectionError, InputError, TLError, TransportError } from "../0_errors.ts";
import { TelegramError, type TelegramErrorParams } from "../3_errors.ts";
import { constructTelegramError } from "../4_errors.ts";

export interface WorkerError {
  name: "TelegramError" | "ConnectionError" | "AccessError" | "InputError" | "TransportError" | "TLError";

  args: any;
}

export function serializeWorkerError(err: unknown): WorkerError {
  if (err instanceof TelegramError) {
    const arg: TelegramErrorParams = {
      error_code: err.errorCode,
      error_message: err.errorMessage,
      call: err.cause,
    };
    return {
      name: "TelegramError",
      args: [arg],
    };
  } else if (err instanceof TLError) {
    return {
      name: "TLError",
      args: [err.originalMessage, err.path],
    };
  } else if (err instanceof TransportError) {
    return {
      name: "TransportError",
      args: [err.code],
    };
  } else if (err instanceof Error) {
    return {

      name: err.name as unknown as any,
      args: [err.message],
    };
  } else {
    return {

      name: "Error" as unknown as any, 
      args: [err],
    };
  }
}

export function deserializeWorkerError(error: WorkerError) {
  switch (error.name) {
    case "TelegramError":
      return constructTelegramError({
        _: "rpc_error",
        error_code: error.args[0].error_code,
        error_message: error.args[0].error_message,
      }, error.args.call);
    case "ConnectionError":
      return new ConnectionError(error.args[0]);
    case "AccessError":
      return new AccessError(error.args[0]);
    case "InputError":
      return new InputError(error.args[0]);
    case "TransportError":
      return new TransportError(error.args[0]);
    case "TLError":
      return new TLError(error.args[0], error.args[1]);
    default:
      return new TypeError("Unknown error");
  }
}
