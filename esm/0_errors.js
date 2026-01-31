export class techgramError extends Error {
}
export class ConnectionError extends techgramError {
    constructor(...args) {
        super(...args);
        this.name = "ConnectionError";
    }
}
export class AccessError extends techgramError {
    constructor(...args) {
        super(...args);
        this.name = "AccessError";
    }
}
export class InputError extends techgramError {
    constructor(...args) {
        super(...args);
        this.name = "InputError";
    }
}
export class TransportError extends techgramError {
    code;
    constructor(code) {
        super(`Transport error: ${code}`);
        this.code = code;
        this.name = "TransportError";
    }
}
export class TLError extends techgramError {
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
