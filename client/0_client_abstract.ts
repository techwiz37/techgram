import type { Connection, ConnectionCallback } from "../2_connection.ts";
import type { DC } from "../3_transport.ts";
import type { Session } from "../4_session.ts";

export abstract class ClientAbstract {
  abstract session: Session;

  get dc(): DC {
    return this.session.dc;
  }

  get cdn(): boolean {
    return this.session.cdn;
  }

  set serverSalt(serverSalt: bigint) {
    this.session.serverSalt = serverSalt;
  }

  get serverSalt(): bigint {
    return this.session.serverSalt;
  }

  get connected(): boolean {
    return this.session.connected;
  }

  async connect() {
    await this.session.connect();
  }

  get disconnected(): boolean {
    return this.session.disconnected;
  }

  disconnect() {
    this.session.disconnect();
  }

  set connectionCallback(connectionCallback: ConnectionCallback | undefined) {
    this.session.connectionCallback = connectionCallback;
  }

  set onConnectionStateChange(onConnectionStateChange: Connection["stateChangeHandler"]) {
    this.session.onConnectionStateChange = onConnectionStateChange;
  }
}
