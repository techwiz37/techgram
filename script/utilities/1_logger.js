"use strict";
// deno-lint-ignore-file no-explicit-any
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUT_BIN = exports.IN_BIN = exports.OUT = exports.IN = exports.TRACE = exports.DEBUG = exports.INFO = exports.WARNING = exports.ERROR = void 0;
exports.setLogVerbosity = setLogVerbosity;
exports.setLogFilter = setLogFilter;
exports.setLoggingProvider = setLoggingProvider;
exports.getLogger = getLogger;
const _0_deps_js_1 = require("../0_deps.js");
const _0_env_js_1 = require("./0_env.js");
let verbosity = (0, _0_env_js_1.getNumber)("LOG_VERBOSITY") || 0;
function setLogVerbosity(verbosity_) {
    verbosity = verbosity_;
}
const LOG_FILTER = (0, _0_env_js_1.getString)("LOG_FILTER");
let filter = LOG_FILTER === null ? null : new RegExp(LOG_FILTER);
function setLogFilter(filter_) {
    filter = filter_;
}
let provider = console;
function setLoggingProvider(provider_) {
    provider = provider_;
}
exports.ERROR = 1;
exports.WARNING = 2;
exports.INFO = 3;
exports.DEBUG = 4;
exports.TRACE = 5;
exports.IN = 10;
exports.OUT = 10;
exports.IN_BIN = 20;
exports.OUT_BIN = 20;
const INA = ">".repeat(6);
const OUTA = "<".repeat(6);
function toHex(p) {
    let s = "";
    for (const b of p) {
        s += b.toString(16).toUpperCase().padStart(2, "0");
    }
    return s;
}
function getLogger(scope) {
    return {
        client(id) {
            return getLogger(`${id.toString().padStart(2)} ${scope}`);
        },
        branch(name) {
            return getLogger(`${scope}::${name}`);
        },
        error(...args) {
            this.log(exports.ERROR, ...args);
        },
        warning(...args) {
            this.log(exports.WARNING, ...args);
        },
        info(...args) {
            this.log(exports.INFO, ...args);
        },
        debug(...args) {
            this.log(exports.DEBUG, ...args);
        },
        trace(...args) {
            this.log(exports.TRACE, ...args);
        },
        in(...args) {
            this.log(exports.IN, INA, ...args);
        },
        out(...args) {
            this.log(exports.OUT, OUTA, ...args);
        },
        inBin(p) {
            if (verbosity < exports.IN_BIN) {
                return;
            }
            this.log(exports.IN_BIN, INA, toHex(p));
        },
        outBin(p) {
            if (verbosity < exports.OUT_BIN) {
                return;
            }
            this.log(exports.OUT_BIN, OUTA, toHex(p));
        },
        log(verbosity_, ...args) {
            if (verbosity < verbosity_) {
                return;
            }
            if (filter !== null && !filter.test(scope)) {
                return;
            }
            let fn;
            switch (verbosity_) {
                case exports.ERROR:
                    fn = provider.error;
                    break;
                case exports.WARNING:
                    fn = provider.warn;
                    break;
                case exports.INFO:
                    fn = provider.info;
                    break;
                case exports.DEBUG:
                    fn = provider.debug;
                    break;
                default:
                    fn = provider.log;
            }
            fn(`[${(0, _0_deps_js_1.format)(new Date(), "yyyy.MM.dd HH:mm:ss.SSS")} ${verbosity_} ${scope}]`, ...args);
        },
    };
}
