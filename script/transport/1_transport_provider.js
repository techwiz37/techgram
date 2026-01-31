"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDcIps = getDcIps;
exports.getDcId = getDcId;
exports.getDc = getDc;
const _0_deps_js_1 = require("../0_deps.js");
function getDcIps(dc, version) {
    switch (version) {
        case "ipv4":
            switch (dc) {
                case "1":
                    return ["149.154.175.50"];
                case "2":
                    return ["149.154.167.51", "95.161.76.100"];
                case "3":
                    return ["149.154.175.100"];
                case "4":
                    return ["149.154.167.91"];
                case "5":
                    return ["149.154.171.5"];
                case "1-test":
                    return ["149.154.175.10"];
                case "2-test":
                    return ["149.154.167.40"];
                case "3-test":
                    return ["149.154.175.117"];
                default:
                    (0, _0_deps_js_1.unreachable)();
            }
            break;
        case "ipv6":
            switch (dc) {
                case "1":
                    return ["2001:b28:f23d:f001::a"];
                case "2":
                    return ["2001:67c:4e8:f002::a"];
                case "3":
                    return ["2001:b28:f23d:f003::a"];
                case "4":
                    return ["2001:67c:4e8:f004::a"];
                case "5":
                    return ["2001:b28:f23f:f005::a"];
                case "1-test":
                    return ["2001:b28:f23d:f001::e"];
                case "2-test":
                    return ["2001:67c:4e8:f002::e"];
                case "3-test":
                    return ["2001:b28:f23d:f003::e"];
                default:
                    (0, _0_deps_js_1.unreachable)();
            }
            break;
        default:
            (0, _0_deps_js_1.unreachable)();
    }
}
function getDcId(dc, cdn) {
    return Number(dc[0]) + (dc.endsWith("-test") ? 10_000 : 0) * (cdn ? -1 : 1);
}
function getDc(dcId) {
    dcId = Math.abs(dcId);
    const test = dcId >= 10_000;
    if (dcId >= 10_000) {
        dcId -= 10_000;
    }
    return `${dcId}${test ? "-test" : ""}`;
}
