"use strict";
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
__exportStar(require("./storage/0_storage.js"), exports);
__exportStar(require("./storage/1_utilities.js"), exports);
__exportStar(require("./storage/2_storage_indexed_db.js"), exports);
__exportStar(require("./storage/2_storage_local_storage.node.js"), exports);
__exportStar(require("./storage/2_storage_memory.js"), exports);
__exportStar(require("./storage/2_storage_session_storage.js"), exports);
