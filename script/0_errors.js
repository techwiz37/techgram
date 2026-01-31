"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLError = exports.TransportError = exports.InputError = exports.AccessError = exports.ConnectionError = exports.techgramError = void 0;
class techgramError extends Error {
}
exports.techgramError = techgramError;
class ConnectionError extends techgramError {
    constructor(...args) {
        super(...args);
        this.name = "ConnectionError";
    }
}
exports.ConnectionError = ConnectionError;
class AccessError extends techgramError {
    constructor(...args) {
        super(...args);
        this.name = "AccessError";
    }
}
exports.AccessError = AccessError;
class InputError extends techgramError {
    constructor(...args) {
        super(...args);
        this.name = "InputError";
    }
}
exports.InputError = InputError;
class TransportError extends techgramError {
    code;
    constructor(code) {
        super(`Transport error: ${code}`);
        this.code = code;
        this.name = "TransportError";
    }
}
exports.TransportError = TransportError;
class TLError extends techgramError {
    name = "TLError";
    #originalMessage;
    #path;
    constructor(message, path) {
        super(`${message}${path.length ? ` at ${path.join(" ")}` : ""}`);
        this.#originalMessage = message;
        this.#path = path;
    }
    get originalMessage() {
        return this.#originalMessage;
    }
    get path() {
        return this.#path;
    }
}
exports.TLError = TLError;
