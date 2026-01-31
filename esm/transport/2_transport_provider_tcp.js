import { ConnectionTCP } from "../connection/1_connection_tcp.node.js";
import { TransportAbridged } from "./1_transport_abridged.js";
import { getDcId, getDcIps } from "./1_transport_provider.js";
export function transportProviderTcp(params) {
    return ({ dc, cdn }) => {
        const connection = new ConnectionTCP(getDcIps(dc, params?.ipv6 ? "ipv6" : "ipv4")[0], 80);
        const transport = new TransportAbridged(connection, params?.obfuscated);
        return { connection, transport, dcId: getDcId(dc, cdn) };
    };
}
