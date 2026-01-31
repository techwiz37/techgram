"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAbstract = void 0;
class ClientAbstract {
    get dc() {
        return this.session.dc;
    }
    get cdn() {
        return this.session.cdn;
    }
    set serverSalt(serverSalt) {
        this.session.serverSalt = serverSalt;
    }
    get serverSalt() {
        return this.session.serverSalt;
    }
    get connected() {
        return this.session.connected;
    }
    async connect() {
        await this.session.connect();
    }
    get disconnected() {
        return this.session.disconnected;
    }
    disconnect() {
        this.session.disconnect();
    }
    set connectionCallback(connectionCallback) {
        this.session.connectionCallback = connectionCallback;
    }
    set onConnectionStateChange(onConnectionStateChange) {
        this.session.onConnectionStateChange = onConnectionStateChange;
    }
}
exports.ClientAbstract = ClientAbstract;
