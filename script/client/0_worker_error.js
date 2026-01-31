"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeWorkerError = serializeWorkerError;
exports.deserializeWorkerError = deserializeWorkerError;
const _0_errors_js_1 = require("../0_errors.js");
const _3_errors_js_1 = require("../3_errors.js");
const _4_errors_js_1 = require("../4_errors.js");
function serializeWorkerError(err) {
    if (err instanceof _3_errors_js_1.TelegramError) {
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
    else if (err instanceof _0_errors_js_1.TLError) {
        return {
            name: "TLError",
            args: [err.originalMessage, err.path],
        };
    }
    else if (err instanceof _0_errors_js_1.TransportError) {
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
function deserializeWorkerError(error) {
    switch (error.name) {
        case "TelegramError":
            return (0, _4_errors_js_1.constructTelegramError)({
                _: "rpc_error",
                error_code: error.args[0].error_code,
                error_message: error.args[0].error_message,
            }, error.args.call);
        case "ConnectionError":
            return new _0_errors_js_1.ConnectionError(error.args[0]);
        case "AccessError":
            return new _0_errors_js_1.AccessError(error.args[0]);
        case "InputError":
            return new _0_errors_js_1.InputError(error.args[0]);
        case "TransportError":
            return new _0_errors_js_1.TransportError(error.args[0]);
        case "TLError":
            return new _0_errors_js_1.TLError(error.args[0], error.args[1]);
        default:
            return new TypeError("Unknown error");
    }
}
