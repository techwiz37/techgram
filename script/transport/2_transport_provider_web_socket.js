"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportProviderWebSocket = void 0;
const _2_connection_js_1 = require("../2_connection.js");
const _1_transport_intermediate_js_1 = require("./1_transport_intermediate.js");
const _1_transport_provider_js_1 = require("./1_transport_provider.js");
const dcToNameMap = {
    "1": "pluto",
    "1-test": "pluto",
    "2": "venus",
    "2-test": "venus",
    "3": "aurora",
    "3-test": "aurora",
    "4": "vesta",
    "5": "flora",
};
const transportProviderWebSocket = (params) => {
    return ({ dc, cdn }) => {
        params ??= {};
        params.wss ??= typeof location !== "undefined" && location.protocol === "http:" && location.hostname !== "localhost" ? false : true;
        const url = `${params.wss ? "wss" : "ws"}://${dcToNameMap[dc]}${cdn ? "-1" : ""}.web.telegram.org/${dc.endsWith("-test") ? "apiws_test" : "apiws"}`;
        const connection = new _2_connection_js_1.ConnectionWebSocket(url);
        const transport = new _1_transport_intermediate_js_1.TransportIntermediate(connection, true);
        const dcId = (0, _1_transport_provider_js_1.getDcId)(dc, cdn);
        return { connection, transport, dcId };
    };
};
exports.transportProviderWebSocket = transportProviderWebSocket;
