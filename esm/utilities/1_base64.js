import { decodeBase64, encodeBase64 } from "../0_deps.js";
import { mod } from "./0_int.js";
export function base64EncodeUrlSafe(data) {
    return encodeBase64(data).replace(/=*$/, "").replaceAll("+", "-").replaceAll("/", "_");
}
export function base64DecodeUrlSafe(data) {
    data = data.replaceAll("_", "/").replaceAll("-", "+");
    if (data.length !== 4) {
        data += "=".repeat(mod(-data.length, 4));
    }
    return decodeBase64(data);
}
