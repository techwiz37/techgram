import { Api } from "../2_tl.ts";
import { constructBusinessConnection, type Update } from "../3_types.ts";
import type { UpdateProcessor } from "./0_update_processor.ts";
import type { C } from "./1_types.ts";

const businessConnectionManagerUpdates = [
  "updateBotBusinessConnect",
] as const;

type BusinessConnectionManagerUpdate = Api.Types[(typeof businessConnectionManagerUpdates)[number]];

export class BusinessConnectionManager implements UpdateProcessor<BusinessConnectionManagerUpdate, true> {
  #c: C;

  constructor(c: C) {
    this.#c = c;
  }

  async getBusinessConnection(id: string) {
    const connection_ = await this.#c.messageStorage.getBusinessConnection(id);
    if (!connection_) {
      const connection_ = await this.#c.invoke({ _: "account.getBotBusinessConnection", connection_id: id })
        .then((v) => Api.as("updates", v))
        .then((v) => Api.as("updateBotBusinessConnect", v.updates[0]).connection);
      await this.#c.messageStorage.setBusinessConnection(id, connection_);
      return constructBusinessConnection(connection_, this.#c.getPeer);
    } else {
      return constructBusinessConnection(connection_, this.#c.getPeer);
    }
  }

  canHandleUpdate(update: Api.Update): update is BusinessConnectionManagerUpdate {
    return Api.isOneOf(businessConnectionManagerUpdates, update);
  }

  async handleUpdate(update: BusinessConnectionManagerUpdate): Promise<Update> {
    if (update.connection.disabled) {
      await this.#c.messageStorage.setBusinessConnection(update.connection.connection_id, null);
    } else {
      await this.#c.messageStorage.setBusinessConnection(update.connection.connection_id, update.connection);
    }
    const businessConnection = constructBusinessConnection(update.connection, this.#c.getPeer);
    return { businessConnection };
  }
}
