"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructRestrictionReason = constructRestrictionReason;
function constructRestrictionReason(rr) {
    return { platform: rr.platform, reason: rr.reason, text: rr.text };
}
