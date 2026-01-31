import { unreachable } from "./0_deps.js";
import { map, TelegramError } from "./3_errors.js";
export * from "./3_errors.js";
export class FloodWait extends TelegramError {
    seconds;
    constructor(params) {
        super(params);
        const p = params.error_message.split("_");
        this.seconds = Number(p[p.length - 1]);
        if (isNaN(this.seconds)) {
            unreachable();
        }
    }
}
export class Migrate extends TelegramError {
    dc;
    constructor(params) {
        super(params);
        const p = params.error_message.split("_");
        this.dc = Number(p[p.length - 1]);
        if (isNaN(this.dc)) {
            unreachable();
        }
    }
}
export class UserMigrate extends Migrate {
}
export class PhoneMigrate extends Migrate {
}
export class FileMigrate extends Migrate {
}
export class StatsMigrate extends Migrate {
}
const prefixMap = {
    "FILE_MIGRATE_": FileMigrate,
    "PHONE_MIGRATE_": PhoneMigrate,
    "USER_MIGRATE_": UserMigrate,
    "STATS_MIGRATE_": StatsMigrate,
    "FLOOD_WAIT_": FloodWait,
};
export function constructTelegramError(error, call) {
    for (const [k, v] of Object.entries(prefixMap)) {
        if (error.error_message.startsWith(k)) {
            return new v({ ...error, call });
        }
    }
    if (error.error_message in map) {
        return new map[error.error_message]({ ...error, call });
    }
    return new TelegramError({ ...error, call });
}
