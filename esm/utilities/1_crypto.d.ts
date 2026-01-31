import * as dntShim from "../_dnt.shims.js";
export declare class CTR {
    #private;
    get _state(): {
        iv: Uint8Array;
        state: number;
    };
    constructor(key: dntShim.CryptoKey, iv: Uint8Array);
    static importKey(key: Uint8Array<ArrayBuffer>): Promise<dntShim.CryptoKey>;
    call(data: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>>;
}
//# sourceMappingURL=1_crypto.d.ts.map