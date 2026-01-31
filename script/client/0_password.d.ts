import { sha256 } from "../1_utilities.js";
import { Api } from "../2_tl.js";
export declare function isSafePrime(primeBytes: Uint8Array, g: number): boolean;
export declare const h: typeof sha256;
export declare const sh: (data: Uint8Array, salt: Uint8Array) => Promise<Uint8Array<ArrayBuffer>>;
export declare const ph1: (password: Uint8Array, salt1: Uint8Array, salt2: Uint8Array) => Promise<Uint8Array<ArrayBuffer>>;
export declare function pbkdf2(password: Uint8Array<ArrayBuffer>, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array<ArrayBuffer>>;
export declare const ph2: (password: Uint8Array, salt1: Uint8Array<ArrayBuffer>, salt2: Uint8Array) => Promise<Uint8Array<ArrayBuffer>>;
export declare function isGoodModExpFirst(modexp: bigint, prime: bigint): boolean;
export declare function pad(bigint: number | bigint | Uint8Array): Uint8Array<ArrayBuffer>;
export declare function checkPassword(password_: string, ap: Api.account_Password): Promise<Api.inputCheckPasswordSRP>;
//# sourceMappingURL=0_password.d.ts.map