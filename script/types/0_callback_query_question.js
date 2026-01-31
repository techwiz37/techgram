"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCallbackQueryQuestion = validateCallbackQueryQuestion;
const _0_errors_js_1 = require("../0_errors.js");
function validateCallbackQueryQuestion(q) {
    if (!["game", "password", "button"].includes(q.type)) {
        throw new _0_errors_js_1.InputError("Got invalid callback query question type.");
    }
    if (q.type === "password" && (typeof q.password !== "string" || !q.password)) {
        throw new _0_errors_js_1.InputError("Got empty password.");
    }
    if ((q.type === "button" || q.type === "password") && (typeof q.data !== "string" || !q.data)) {
        throw new _0_errors_js_1.InputError("Got empty button data.");
    }
}
