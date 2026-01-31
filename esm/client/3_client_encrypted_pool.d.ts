import type { ClientEncrypted } from "./2_client_encrypted.js";
export declare class ClientEncryptedPool {
    #private;
    get size(): number;
    add(client: ClientEncrypted): void;
    nextClient(): ClientEncrypted;
    disconnect(): void;
    map(callback: (client: ClientEncrypted) => void): void;
}
//# sourceMappingURL=3_client_encrypted_pool.d.ts.map