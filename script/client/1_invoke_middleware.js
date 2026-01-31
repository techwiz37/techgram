"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipInvoke = skipInvoke;
function skipInvoke() {
    return (_ctx, next) => next();
}
