"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionError = void 0;
const _0_errors_js_1 = require("../0_errors.js");
class SessionError extends _0_errors_js_1.techgramError {
    constructor(message) {
        super(message);
    }
}
exports.SessionError = SessionError;
