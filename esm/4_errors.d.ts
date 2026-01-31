import { TelegramError, type TelegramErrorParams } from "./3_errors.js";
import type { Mtproto } from "./2_tl.js";
export * from "./3_errors.js";
export declare class FloodWait extends TelegramError {
    seconds: number;
    constructor(params: TelegramErrorParams);
}
export declare class Migrate extends TelegramError {
    dc: number;
    constructor(params: TelegramErrorParams);
}
export declare class UserMigrate extends Migrate {
}
export declare class PhoneMigrate extends Migrate {
}
export declare class FileMigrate extends Migrate {
}
export declare class StatsMigrate extends Migrate {
}
export declare function constructTelegramError(error: Mtproto.rpc_error, call: unknown): TelegramError;
//# sourceMappingURL=4_errors.d.ts.map