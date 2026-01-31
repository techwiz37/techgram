import * as dntShim from "../_dnt.shims.js";
import { concat } from "../0_deps.js";
import { CTR, intToBytes } from "../1_utilities.js";
export async function getObfuscationParameters(protocol, connection) {
    let init;
    while (true) {
        init = concat([dntShim.crypto.getRandomValues(new Uint8Array(56)), intToBytes(protocol, 4, { byteOrder: "big", isSigned: false }), dntShim.crypto.getRandomValues(new Uint8Array(4))]);
        if (init[0] === 0xEF) {
            continue;
        }
        const dataView = new DataView(init.buffer, init.byteOffset, init.byteLength);
        const firstInt = dataView.getInt32(0);
        if ([0x44414548, 0x54534F50, 0x20544547, 0x4954504F, 0x02010316, 0xDDDDDDDD, 0xEEEEEEEE].includes(firstInt)) {
            continue;
        }
        const secondInt = dataView.getInt32(4);
        if (secondInt === 0x00000000) {
            continue;
        }
        break;
    }
    const encryptKey = init.slice(8, 8 + 32);
    const encryptIv = init.slice(40, 40 + 16);
    const importedEncryptedKey = await CTR.importKey(encryptKey);
    const encryptionCTR = new CTR(importedEncryptedKey, encryptIv);
    const encryptedInit = await encryptionCTR.call(init);
    const initRev = new Uint8Array(init).reverse();
    const decryptKey = initRev.slice(8, 8 + 32);
    const decryptIv = initRev.slice(40, 40 + 16);
    const importedDecryptKey = await CTR.importKey(decryptKey);
    const decryptionCTR = new CTR(importedDecryptKey, decryptIv);
    await connection.write(concat([init.subarray(0, 56), encryptedInit.subarray(56, 56 + 8)]));
    return { encryptionCTR, decryptionCTR };
}
