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
exports.StatsMigrate = exports.FileMigrate = exports.PhoneMigrate = exports.UserMigrate = exports.Migrate = exports.FloodWait = void 0;
exports.constructTelegramError = constructTelegramError;
const _0_deps_js_1 = require("./0_deps.js");
const _3_errors_js_1 = require("./3_errors.js");
__exportStar(require("./3_errors.js"), exports);
class FloodWait extends _3_errors_js_1.TelegramError {
    seconds;
    constructor(params) {
        super(params);
        const p = params.error_message.split("_");
        this.seconds = Number(p[p.length - 1]);
        if (isNaN(this.seconds)) {
            (0, _0_deps_js_1.unreachable)();
        }
    }
}
exports.FloodWait = FloodWait;
class Migrate extends _3_errors_js_1.TelegramError {
    dc;
    constructor(params) {
        super(params);
        const p = params.error_message.split("_");
        this.dc = Number(p[p.length - 1]);
        if (isNaN(this.dc)) {
            (0, _0_deps_js_1.unreachable)();
        }
    }
}
exports.Migrate = Migrate;
class UserMigrate extends Migrate {
}
exports.UserMigrate = UserMigrate;
class PhoneMigrate extends Migrate {
}
exports.PhoneMigrate = PhoneMigrate;
class FileMigrate extends Migrate {
}
exports.FileMigrate = FileMigrate;
class StatsMigrate extends Migrate {
}
exports.StatsMigrate = StatsMigrate;
const prefixMap = {
    "FILE_MIGRATE_": FileMigrate,
    "PHONE_MIGRATE_": PhoneMigrate,
    "USER_MIGRATE_": UserMigrate,
    "STATS_MIGRATE_": StatsMigrate,
    "FLOOD_WAIT_": FloodWait,
};
function constructTelegramError(error, call) {
    for (const [k, v] of Object.entries(prefixMap)) {
        if (error.error_message.startsWith(k)) {
            return new v({ ...error, call });
        }
    }
    if (error.error_message in _3_errors_js_1.map) {
        return new _3_errors_js_1.map[error.error_message]({ ...error, call });
    }
    return new _3_errors_js_1.TelegramError({ ...error, call });
}
