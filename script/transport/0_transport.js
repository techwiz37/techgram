"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
class Transport {
    obfuscationParameters = null;
    async encrypt(buffer) {
        if (this.obfuscationParameters) {
            return await this.obfuscationParameters.encryptionCTR.call(buffer);
        }
        else {
            return buffer;
        }
    }
    async decrypt(buffer) {
        if (this.obfuscationParameters) {
            return await this.obfuscationParameters.decryptionCTR.call(buffer);
        }
        else {
            return buffer;
        }
    }
}
exports.Transport = Transport;
