import type { CTR, MaybePromise } from "../1_utilities.js";
export declare abstract class Transport {
    protected obfuscationParameters: {
        encryptionCTR: CTR;
        decryptionCTR: CTR;
    } | null;
    protected encrypt(buffer: Uint8Array<ArrayBuffer>): Promise<Uint8Array>;
    protected decrypt(buffer: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>>;
    abstract initialize(): MaybePromise<void>;
    abstract receive(): MaybePromise<Uint8Array>;
    abstract send(buffer: Uint8Array): MaybePromise<void>;
}
//# sourceMappingURL=0_transport.d.ts.map