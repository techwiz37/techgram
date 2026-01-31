import { Api } from "../2_tl.js";
import { constructBusinessConnection } from "../3_types.js";
const businessConnectionManagerUpdates = [
    "updateBotBusinessConnect",
];
export class BusinessConnectionManager {
    #c;
    constructor(c) {
        this.#c = c;
    }
    async getBusinessConnection(id) {
        const connection_ = await this.#c.messageStorage.getBusinessConnection(id);
        if (!connection_) {
            const connection_ = await this.#c.invoke({ _: "account.getBotBusinessConnection", connection_id: id })
                .then((v) => Api.as("updates", v))
                .then((v) => Api.as("updateBotBusinessConnect", v.updates[0]).connection);
            await this.#c.messageStorage.setBusinessConnection(id, connection_);
            return constructBusinessConnection(connection_, this.#c.getPeer);
        }
        else {
            return constructBusinessConnection(connection_, this.#c.getPeer);
        }
    }
    canHandleUpdate(update) {
        return Api.isOneOf(businessConnectionManagerUpdates, update);
    }
    async handleUpdate(update) {
        if (update.connection.disabled) {
            await this.#c.messageStorage.setBusinessConnection(update.connection.connection_id, null);
        }
        else {
            await this.#c.messageStorage.setBusinessConnection(update.connection.connection_id, update.connection);
        }
        const businessConnection = constructBusinessConnection(update.connection, this.#c.getPeer);
        return { businessConnection };
    }
}
