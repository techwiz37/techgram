import { format } from "../0_deps.ts";
import { getNumber, getString } from "./0_env.ts";

let verbosity = getNumber("LOG_VERBOSITY") || 0;
export function setLogVerbosity(verbosity_: number) {
  verbosity = verbosity_;
}
const LOG_FILTER = getString("LOG_FILTER");
let filter: RegExp | null = LOG_FILTER === null ? null : new RegExp(LOG_FILTER);
export function setLogFilter(filter_: RegExp | null) {
  filter = filter_;
}
let provider: LoggingProvider = console;

export interface LoggingProvider {
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  log(...args: any[]): void;
}

export function setLoggingProvider(provider_: LoggingProvider) {
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
function toHex(p: Uint8Array) {
  let s = "";
  for (const b of p) {
    s += b.toString(16).toUpperCase().padStart(2, "0");
  }
  return s;
}
export function getLogger(scope: string) {
  return {
    client(id: number) {
      return getLogger(`${id.toString().padStart(2)} ${scope}`);
    },
    branch(name: string) {
      return getLogger(`${scope}::${name}`);
    },
    error(...args: any[]) {
      this.log(ERROR, ...args);
    },
    warning(...args: any[]) {
      this.log(WARNING, ...args);
    },
    info(...args: any[]) {
      this.log(INFO, ...args);
    },
    debug(...args: any[]) {
      this.log(DEBUG, ...args);
    },
    trace(...args: any[]) {
      this.log(TRACE, ...args);
    },
    in(...args: any[]) {
      this.log(IN, INA, ...args);
    },
    out(...args: any[]) {
      this.log(OUT, OUTA, ...args);
    },
    inBin(p: Uint8Array) {
      if (verbosity < IN_BIN) { 
        return;
      }
      this.log(IN_BIN, INA, toHex(p));
    },
    outBin(p: Uint8Array) {
      if (verbosity < OUT_BIN) { 
        return;
      }
      this.log(OUT_BIN, OUTA, toHex(p));
    },
    log(verbosity_: number, ...args: any[]) {
      if (verbosity < verbosity_) {
        return;
      }
      if (filter !== null && !filter.test(scope)) {
        return;
      }
      let fn: typeof provider["log"];
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

export type Logger = ReturnType<typeof getLogger>;
