import { AccessError, ConnectionError, InputError, TLError, TransportError } from "../0_errors.js";
import { TelegramError } from "../3_errors.js";
import { constructTelegramError } from "../4_errors.js";
export function serializeWorkerError(err) {
    if (err instanceof TelegramError) {
        const arg = {
            error_code: err.errorCode,
            error_message: err.errorMessage,
            call: err.cause,
        };
        return {
            name: "TelegramError",
            args: [arg],
        };
    }
    else if (err instanceof TLError) {
        return {
            name: "TLError",
            args: [err.originalMessage, err.path],
        };
    }
    else if (err instanceof TransportError) {
        return {
            name: "TransportError",
            args: [err.code],
        };
    }
    else if (err instanceof Error) {
        return {
            name: err.name,
            args: [err.message],
        };
    }
    else {
        return {
            name: "Error",
            args: [err],
        };
    }
}
export function deserializeWorkerError(error) {
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
