import * as dntShim from "../_dnt.shims.js";
export async function sha256(payload) {
    return new Uint8Array(await dntShim.crypto.subtle.digest("SHA-256", payload));
}
export async function sha1(payload) {
    return new Uint8Array(await dntShim.crypto.subtle.digest("SHA-1", payload));
}
