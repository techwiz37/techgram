"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatisticsManager = void 0;
const _1_logger_js_1 = require("../utilities/1_logger.js");
class NetworkStatisticsManager {
    #c;
    #L;
    constructor(c) {
        this.#c = c;
        this.#L = (0, _1_logger_js_1.getLogger)("NetworkStatisticsManager");
    }
    async getNetworkStatistics() {
        const [messagesRead, messagesWrite, cdnRead, cdnWrite] = await Promise.all([
            this.#c.storage.get(["netstat_messages_read"]),
            this.#c.storage.get(["netstat_messages_write"]),
            this.#c.storage.get(["netstat_cdn_read"]),
            this.#c.storage.get(["netstat_cdn_write"]),
        ]);
        const messages = {
            sent: Number(messagesWrite || 0),
            received: Number(messagesRead || 0),
        };
        const cdn = {
            sent: Number(cdnWrite || 0),
            received: Number(cdnRead || 0),
        };
        return { messages, cdn };
    }
    #pendingWrites = {};
    getTransportReadWriteCallback(cdn) {
        return {
            read: (count) => {
                const key = cdn ? "netstat_cdn_read" : "netstat_messages_read";
                this.#pendingWrites[key] = (this.#pendingWrites[key] ?? 0) + count;
                this.#write();
            },
            write: (count) => {
                const key = cdn ? "netstat_cdn_write" : "netstat_messages_write";
                this.#pendingWrites[key] = (this.#pendingWrites[key] ?? 0) + count;
                this.#write();
            },
        };
    }
    #writing = false;
    async #write() {
        if (this.#writing) {
            return;
        }
        this.#writing = true;
        for (const [k, v] of Object.entries(this.#pendingWrites)) {
            if (v < 1) {
                continue;
            }
            try {
                await this.#c.messageStorage.incr([k], v);
                this.#pendingWrites[k] -= v;
            }
            catch (err) {
                this.#L.error("write failed:", err);
            }
        }
        this.#writing = false;
    }
}
exports.NetworkStatisticsManager = NetworkStatisticsManager;
