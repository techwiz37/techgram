// deno-lint-ignore-file no-explicit-any
import { format } from "../0_deps.js";
import { getNumber, getString } from "./0_env.js";
let verbosity = getNumber("LOG_VERBOSITY") || 0;
export function setLogVerbosity(verbosity_) {
    verbosity = verbosity_;
}
const LOG_FILTER = getString("LOG_FILTER");
let filter = LOG_FILTER === null ? null : new RegExp(LOG_FILTER);
export function setLogFilter(filter_) {
    filter = filter_;
}
let provider = console;
export function setLoggingProvider(provider_) {
    provider = provider_;
}
export const ERROR = 1;
export const WARNING = 2;
export const INFO = 3;
export const DEBUG = 4;
export const TRACE = 5;
export const IN = 10;
export const OUT = 10;
export const IN_BIN = 20;
export const OUT_BIN = 20;
const INA = ">".repeat(6);
const OUTA = "<".repeat(6);
function toHex(p) {
    let s = "";
    for (const b of p) {
        s += b.toString(16).toUpperCase().padStart(2, "0");
    }
    return s;
}
export function getLogger(scope) {
    return {
        client(id) {
            return getLogger(`${id.toString().padStart(2)} ${scope}`);
        },
        branch(name) {
            return getLogger(`${scope}::${name}`);
        },
        error(...args) {
            this.log(ERROR, ...args);
        },
        warning(...args) {
            this.log(WARNING, ...args);
        },
        info(...args) {
            this.log(INFO, ...args);
        },
        debug(...args) {
            this.log(DEBUG, ...args);
        },
        trace(...args) {
            this.log(TRACE, ...args);
        },
        in(...args) {
            this.log(IN, INA, ...args);
        },
        out(...args) {
            this.log(OUT, OUTA, ...args);
        },
        inBin(p) {
            if (verbosity < IN_BIN) {
                return;
            }
            this.log(IN_BIN, INA, toHex(p));
        },
        outBin(p) {
            if (verbosity < OUT_BIN) {
                return;
            }
            this.log(OUT_BIN, OUTA, toHex(p));
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
                case ERROR:
                    fn = provider.error;
                    break;
                case WARNING:
                    fn = provider.warn;
                    break;
                case INFO:
                    fn = provider.info;
                    break;
                case DEBUG:
                    fn = provider.debug;
                    break;
                default:
                    fn = provider.log;
            }
            fn(`[${format(new Date(), "yyyy.MM.dd HH:mm:ss.SSS")} ${verbosity_} ${scope}]`, ...args);
        },
    };
}
