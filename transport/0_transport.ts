import type { CTR, MaybePromise } from "../1_utilities.ts";

export abstract class Transport {
  protected obfuscationParameters: { encryptionCTR: CTR; decryptionCTR: CTR } | null = null;

  protected async encrypt(buffer: Uint8Array<ArrayBuffer>): Promise<Uint8Array> {
    if (this.obfuscationParameters) {
      return await this.obfuscationParameters.encryptionCTR.call(buffer);
    } else {
      return buffer;
    }
  }

  protected async decrypt(buffer: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> {
    if (this.obfuscationParameters) {
      return await this.obfuscationParameters.decryptionCTR.call(buffer);
    } else {
      return buffer;
    }
  }

  abstract initialize(): MaybePromise<void>;
  abstract receive(): MaybePromise<Uint8Array>;
  abstract send(buffer: Uint8Array): MaybePromise<void>;
}
