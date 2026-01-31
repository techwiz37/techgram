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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = exports.SYSTEM_VERSION = exports.SYSTEM_LANG_CODE = exports.LANG_PACK = exports.LANG_CODE = exports.INITIAL_DC = exports.DEVICE_MODEL = exports.APP_VERSION = exports.checkPassword = exports.setLogVerbosity = exports.setLoggingProvider = exports.setLogFilter = exports.getRandomId = exports.getColorName = exports.getColorFromPeerId = void 0;
require("./_dnt.polyfills.js");
const dntShim = __importStar(require("./_dnt.shims.js"));
var _1_utilities_js_1 = require("./1_utilities.js");
Object.defineProperty(exports, "getColorFromPeerId", { enumerable: true, get: function () { return _1_utilities_js_1.getColorFromPeerId; } });
Object.defineProperty(exports, "getColorName", { enumerable: true, get: function () { return _1_utilities_js_1.getColorName; } });
Object.defineProperty(exports, "getRandomId", { enumerable: true, get: function () { return _1_utilities_js_1.getRandomId; } });
Object.defineProperty(exports, "setLogFilter", { enumerable: true, get: function () { return _1_utilities_js_1.setLogFilter; } });
Object.defineProperty(exports, "setLoggingProvider", { enumerable: true, get: function () { return _1_utilities_js_1.setLoggingProvider; } });
Object.defineProperty(exports, "setLogVerbosity", { enumerable: true, get: function () { return _1_utilities_js_1.setLogVerbosity; } });
var _0_password_js_1 = require("./client/0_password.js");
Object.defineProperty(exports, "checkPassword", { enumerable: true, get: function () { return _0_password_js_1.checkPassword; } });
__exportStar(require("./2_connection.js"), exports);
__exportStar(require("./2_storage.js"), exports);
__exportStar(require("./3_transport.js"), exports);
__exportStar(require("./2_tl.js"), exports);
__exportStar(require("./3_types.js"), exports);
var _4_constants_js_1 = require("./4_constants.js");
Object.defineProperty(exports, "APP_VERSION", { enumerable: true, get: function () { return _4_constants_js_1.APP_VERSION; } });
Object.defineProperty(exports, "DEVICE_MODEL", { enumerable: true, get: function () { return _4_constants_js_1.DEVICE_MODEL; } });
Object.defineProperty(exports, "INITIAL_DC", { enumerable: true, get: function () { return _4_constants_js_1.INITIAL_DC; } });
Object.defineProperty(exports, "LANG_CODE", { enumerable: true, get: function () { return _4_constants_js_1.LANG_CODE; } });
Object.defineProperty(exports, "LANG_PACK", { enumerable: true, get: function () { return _4_constants_js_1.LANG_PACK; } });
Object.defineProperty(exports, "SYSTEM_LANG_CODE", { enumerable: true, get: function () { return _4_constants_js_1.SYSTEM_LANG_CODE; } });
Object.defineProperty(exports, "SYSTEM_VERSION", { enumerable: true, get: function () { return _4_constants_js_1.SYSTEM_VERSION; } });
exports.errors = __importStar(require("./4_errors.js"));
__exportStar(require("./5_client.js"), exports);
const node_zlib_1 = require("node:zlib");
// From https://github.com/ungap/compression-stream/blob/main/index.js with slight modifications.
if (!("CompressionStream" in dntShim.dntGlobalThis)) {
    class Stream {
        readable;
        writable;
        constructor(compress, format) {
            let handler;
            if (format === "gzip") {
                handler = compress ? (0, node_zlib_1.createGzip)() : (0, node_zlib_1.createGunzip)();
            }
            else if (format === "deflate") {
                handler = compress ? (0, node_zlib_1.createDeflate)() : (0, node_zlib_1.createInflate)();
            }
            else if (format === "deflate-raw") {
                handler = compress ? (0, node_zlib_1.createDeflateRaw)() : (0, node_zlib_1.createInflateRaw)();
            }
            else {
                throw new TypeError([
                    `Failed to construct '${this.constructor.name}'`,
                    `Unsupported compression format: '${format}'`,
                ].join(": "));
            }
            this.readable = new ReadableStream({
                type: "bytes",
                start: (controller) => {
                    handler.on("data", (chunk) => controller.enqueue(chunk));
                    handler.once("end", () => controller.close());
                },
            });
            this.writable = new WritableStream({
                write: (chunk) => void handler.write(chunk),
                close: () => void handler.end(),
            });
        }
    }
    globalThis.CompressionStream = class CompressionStream extends Stream {
        constructor(format) {
            super(true, format);
        }
    };
    globalThis.DecompressionStream = class DecompressionStream extends Stream {
        constructor(format) {
            super(false, format);
        }
    };
}
