import { InputError } from "../0_errors.js";
const MAX_INT_32 = ~~(0xFFFFFFFF / 2);
export function constructSelfDestructOption(ttlSeconds) {
    if (ttlSeconds === MAX_INT_32) {
        return "afterOpen";
    }
    else {
        return ttlSeconds;
    }
}
export function selfDestructOptionToInt(option) {
    if (option === "afterOpen") {
        return 2147483647;
    }
    else if (typeof option === "number") {
        if (option === 0) {
            throw new InputError("Self destruct option cannot be zero.");
        }
        else if (option < 0) {
            throw new InputError("Self destruct option cannot be negative.");
        }
        else {
            return option;
        }
    }
    else {
        throw new InputError("Invalid self destruct option.");
    }
}
