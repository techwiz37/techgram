"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportProviderTcp = transportProviderTcp;
const _1_connection_tcp_node_js_1 = require("../connection/1_connection_tcp.node.js");
const _1_transport_abridged_js_1 = require("./1_transport_abridged.js");
const _1_transport_provider_js_1 = require("./1_transport_provider.js");
function transportProviderTcp(params) {
    return ({ dc, cdn }) => {
        const connection = new _1_connection_tcp_node_js_1.ConnectionTCP((0, _1_transport_provider_js_1.getDcIps)(dc, params?.ipv6 ? "ipv6" : "ipv4")[0], 80);
        const transport = new _1_transport_abridged_js_1.TransportAbridged(connection, params?.obfuscated);
        return { connection, transport, dcId: (0, _1_transport_provider_js_1.getDcId)(dc, cdn) };
    };
}
