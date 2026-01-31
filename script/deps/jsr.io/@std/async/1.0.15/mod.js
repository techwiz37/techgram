"use strict";
// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./abortable.js"), exports);
__exportStar(require("./deadline.js"), exports);
__exportStar(require("./debounce.js"), exports);
__exportStar(require("./delay.js"), exports);
__exportStar(require("./mux_async_iterator.js"), exports);
__exportStar(require("./pool.js"), exports);
__exportStar(require("./tee.js"), exports);
__exportStar(require("./retry.js"), exports);
