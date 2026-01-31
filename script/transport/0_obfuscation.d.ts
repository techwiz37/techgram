import { CTR } from "../1_utilities.js";
import type { Connection } from "../2_connection.js";
export declare function getObfuscationParameters(protocol: number, connection: Connection): Promise<{
    encryptionCTR: CTR;
    decryptionCTR: CTR;
}>;
//# sourceMappingURL=0_obfuscation.d.ts.map